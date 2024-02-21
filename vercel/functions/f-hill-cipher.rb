require_relative "./functions"
require "matrix"

def hill_cipher_controller(body)
  # parse body
  body = JSON.parse(body)
  mode = body["mode"]
  text = body["text"]
  key = body["key"]
  matrix_size = Integer(body["matrixSize"]) || 3
  is_base64 = body["isBase64"] || false

  # handle error
  if text.nil? || key.nil? || mode.nil?
    response.status = 400
    return { error: "text and key and mode are required" }
  end

  key_array = []
  key.chars.each_slice(matrix_size) { |slice|
    slice = slice.map { |x| x.ord - "a".ord }
    key_array << slice
  }
  key = Matrix.rows(key_array)

  if !key.square?
    response.status = 400
    return { error: "key length is not appropriate" }
  end

  if !is_invertible?(key)   # Based on modulo 26
    response.status = 400
    return { error: "key is unavailable, please change the key (key is not invertible mod 26)" }
  end

  # main action
  result_text = hill_cipher_main(mode, text, key, matrix_size)

  return result_outputer(result_text, is_base64)
end

def hill_cipher_main(mode, text, key, matrix_size)
  text = text.gsub(/[^a-zA-Z]/, "").downcase
  # key = Matrix.rows(key)

  if mode == "encrypt"
    return hill_cipher_encrypt(text, key, matrix_size)
  elsif mode == "decrypt"
    return hill_cipher_decrypt(text, key, matrix_size)
  end
end

def hill_cipher_decrypt(ciphertext, key, matrix_size)
  inverse_key = inverse_modulo_matrix(key)

  plaintext = ""
  ciphertext.chars.each_slice(matrix_size) do |slice|
    slice = slice.map { |x| x.ord - "a".ord }
    plaintext << (inverse_key * Matrix.column_vector(slice)).column(0).to_a.map { |x| (x % 26) + "a".ord }.pack("C*")
  end

  # Remove padding
  plaintext = plaintext.gsub(/j+$/, "")

  return plaintext
end

def hill_cipher_encrypt(plaintext, key, matrix_size)
  # Pad with 'j'
  if plaintext.length % matrix_size != 0
    plaintext += "j" * (matrix_size - (plaintext.length % matrix_size))
  end

  ciphertext = ""
  plaintext.chars.each_slice(matrix_size) do |slice|
    slice = slice.map { |x| x.ord - "a".ord }
    ciphertext << (key * Matrix.column_vector(slice)).column(0).to_a.map { |x| (x % 26) + "a".ord }.pack("C*")
  end

  return ciphertext
end

def inverse_modulo_matrix(mx)
  result = (inverse_modulo(mx.det, 26) * mx.adjugate)
  return result.collect { |x| x % 26 }
end

def inverse_modulo(a, m)
  a = a % m
  (1..m).each do |i|
    return i if (a * i) % m == 1
  end
  return 1
end

def is_coprime?(a, b)
  return a.gcd(b) == 1
end

def is_invertible?(mx)
  return is_coprime?(mx.det, 26)
end
