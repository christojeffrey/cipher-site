require_relative "./functions"

# Assume: 3-rotor enigma cipher for 26 letters
def enigma_cipher_controller(body, response)
  # parse body
  body = JSON.parse(body)
  mode = body["mode"]
  text = body["text"]
  key = body["key"]
  is_base64 = body["isBase64"] || false

  # handle error
  if text.nil? || key.nil? || mode.nil?
    response.status = 400
    return { error: "text and key and mode are required" }
  end

  if key.length != 3 || key.match(/[^a-zA-Z]/)
    response.status = 400
    return { error: "key must be exactly 3 letters" }
  end

  # main action
  result_text = enigma_cipher_main(mode, text, key)

  return result_outputer(result_text, is_base64)
end

def enigma_cipher_main(mode, text, key)
  text = text.gsub(/[^a-zA-Z]/, "").downcase
  key = key.downcase
  rotors = initialize_rotors(key)

  if mode == "encrypt"
    return enigma_cipher_encrypt(text, rotors)
  elsif mode == "decrypt"
    return enigma_cipher_decrypt(text, rotors)
  end
end

def enigma_cipher_decrypt(ciphertext, rotors)
  plaintext = ""

  ciphertext.each_char do |char|
    sub3 = (rotors[:rotor3].index(char) - rotors[:position3]) % 26 + "a".ord
    sub2 = (rotors[:rotor2].index(sub3.chr) - rotors[:position2]) % 26 + "a".ord
    sub1 = (rotors[:rotor1].index(sub2.chr) - rotors[:position1]) % 26 + "a".ord

    plaintext << sub1.chr
    rotors = rotate_rotors(rotors)
  end

  return plaintext
end

def enigma_cipher_encrypt(plaintext, rotors)
  ciphertext = ""

  plaintext.each_char do |char|
    sub1 = rotors[:rotor1][(rotors[:position1] + char.ord - "a".ord) % 26]
    sub2 = rotors[:rotor2][(rotors[:position2] + sub1.ord - "a".ord) % 26]
    sub3 = rotors[:rotor3][(rotors[:position3] + sub2.ord - "a".ord) % 26]

    ciphertext << sub3
    rotors = rotate_rotors(rotors)
  end

  return ciphertext
end

def initialize_rotors(key)
  # Rotor substitution patterns are fixed
  rotor1 = "ekmflgdqvzntowyhxuspaibrcj"   # fast rotor
  rotor2 = "ajdksiruxblhwtmcqgznpyfvoe"   # medium rotor
  rotor3 = "bdfhjlcprtxvznyeiwgakmusqo"   # slow rotor

  return {
    rotor1: rotor1,
    rotor2: rotor2,
    rotor3: rotor3,
    position1: rotor1.index(key[0]),  # 'A' -> key[0]
    position2: rotor2.index(key[1]),  # 'A' -> key[1]
    position3: rotor3.index(key[2]),  # 'A' -> key[2]
  }
end

def rotate_rotors(rotors)
  rotors[:position1] = (rotors[:position1] + 1) % 26

  if rotors[:position1] == 0
    rotors[:position2] = (rotors[:position2] + 1) % 26

    if rotors[:position2] == 0
      rotors[:position3] = (rotors[:position3] + 1) % 26
    end
  end

  return rotors
end
