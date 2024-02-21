require_relative "./functions"

def affine_cipher_controller(body, response)
  # parse body
  body = JSON.parse(body)
  mode = body["mode"]
  text = body["text"]
  key_m = Integer(body["keyM"])
  key_b = Integer(body["keyB"])
  is_base64 = body["isBase64"] || false

  # handle error
  if text.nil? || key_m.nil? || key_b.nil? || mode.nil?
      response.status = 400
      return { error: "text, keyM, keyB, and mode are required" }
  end

  if !is_coprime?(key_m, 26)
    response.status = 400
    return { error: "keyM must be coprime with 26" }
  end

  # main action
  result_text = affine_cipher_main(mode, text, key_m, key_b)

  return result_outputer(result_text, is_base64)
end

def affine_cipher_main(mode, text, key_m, key_b)
  text = text.gsub(/[^a-zA-Z]/, "").downcase
  if mode == "encrypt"
    return affine_cipher_encrypt(text, key_m, key_b)
  elsif mode == "decrypt"
    return affine_cipher_decrypt(text, key_m, key_b)
  end
end

def affine_cipher_decrypt(ciphertext, key_m, key_b)
  plaintext = ""
  key_m_inverse = inverse_modulo(key_m, 26)
  ciphertext.each_char do |char|
    # P = m^-1 * (C - b) % n
    plaintext << ((key_m_inverse * (char.ord - 'a'.ord - key_b)) % 26 + 'a'.ord).chr
  end

  return plaintext
end

def affine_cipher_encrypt(plaintext, key_m, key_b)
  ciphertext = ""
  plaintext.each_char do |char|
    # C = (m * P + b) % n
    ciphertext << ((key_m * (char.ord - 'a'.ord) + key_b) % 26 + 'a'.ord).chr
  end

  return ciphertext
end

def is_coprime?(a, b)
  return a.gcd(b) == 1
end

def inverse_modulo(a, m)
  a = a % m
  (1..m).each do |i|
    return i if (a * i) % m == 1
  end
  return 1
end
