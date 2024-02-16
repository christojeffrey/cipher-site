require_relative "./functions"
require "matrix"

def hill_cipher_controller(body)
  # parse body
  body = JSON.parse(body)
  mode = body["mode"]
  text = body["text"]
  key = body["key"]
  matrix_size = body["matrixSize"] || 3
  is_base64 = body["isBase64"] || false

  # handle error
  if text.nil? || key.nil? || mode.nil?
    response.status = 400
    return render json: { error: "text and key and mode are required" }
  end

  key = Matrix.rows(key)

  if key.square?
    response.status = 400
    return render json: { error: "key must be a matrix" }
  end

  if key.singular?
    response.status = 400
    return render json: { error: "key must be non-singular matrix" }
  end

  # main action
  result_text = hill_cipher_main(mode, text, key, matrix_size)

  return result_outputer(result_text, is_base64)
end

def hill_cipher_main(mode, text, key, matrix_size)
  text = text.gsub(/[^a-zA-Z]/, "").downcase
  key = Matrix.rows(key)

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

  return plaintext
end

def hill_cipher_encrypt(plaintext, key, matrix_size)
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
