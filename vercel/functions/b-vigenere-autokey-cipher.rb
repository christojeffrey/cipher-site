require_relative "./functions"

def vigenere_autokey_cipher_controller(body, response)
    # parse body
    body = JSON.parse(body)
    mode = body["mode"]
    text = body["text"]
    key = body["key"]
    isBase64 = body["isBase64"] || false

    # handle error
    if text.nil? || key.nil? || mode.nil?
        response.status = 400
        return { error: "text and key and mode are required" }
    end

    # main action
    result_text = vigenere_autokey_cipher_main(mode, text, key)

    return result_outputer(result_text, isBase64)
end

def vigenere_autokey_cipher_main(mode, text, key)
    # clean the text. remove any non-letter characters. will lowercase the text
    text = text.gsub(/[^a-zA-Z]/, "").downcase
    # text limitations: only 26 letters. will remove any non-letter characters
    # will return string.
    if mode == "encrypt"
        return vigenere_autokey_cipher_encrypt(text, key)
    elsif mode == "decrypt"
        return vigenere_autokey_cipher_decrypt(text, key)
    end
end

def vigenere_autokey_cipher_decrypt(ciphertext, key)
    # create a new string to store the plaintext
    plaintext = ""
    # create a variable to store the key index
    key_index = 0
    full_key = key
    # iterate through each character in the ciphertext
    ciphertext.each_char do |char|
        # get the character code of the key character
        key_char_code = full_key[key_index].ord - 97
        # get the character code of the ciphertext character
        ciphertext_char_code = char.ord - 97
        # subtract the ciphertext character code from the key character code
        new_char_code = ciphertext_char_code - key_char_code
        # if the new character code is less than 0, add 26 to the new character code
        if new_char_code < 0
            new_char_code += 26
        end
        # add 97 to the new character code
        new_char_code += 97
        # convert the new character code to a character
        new_char = new_char_code.chr
        # add the new character to the plaintext
        plaintext += new_char
        # increment the key index
        key_index += 1

        # add the new character to the key
        full_key += new_char
    end
    # return the plaintext
    return plaintext
end

def vigenere_autokey_cipher_encrypt(plaintext, key) 
    # create a new string to store the ciphertext
    ciphertext = ""
    # create a variable to store the key index
    key_index = 0
    full_key = key + plaintext
    # iterate through each character in the plaintext
    plaintext.each_char do |char|
        # get the character code of the key character
        key_char_code = full_key[key_index].ord - 97
        # get the character code of the plaintext character
        plaintext_char_code = char.ord - 97
        # add the two character codes together
        new_char_code = plaintext_char_code + key_char_code

        # modulo the new character code by 26
        new_char_code = new_char_code % 26
        # add 97 to the new character code
        new_char_code += 97
        # convert the new character code to a character
        new_char = new_char_code.chr
        # add the new character to the ciphertext
        ciphertext += new_char
        # increment the key index
        key_index += 1
    end
    # return the ciphertext
    return ciphertext
  end