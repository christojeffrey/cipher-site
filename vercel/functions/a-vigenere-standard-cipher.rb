# every functions in this file will return json

def vigenere_standard_cipher(plaintext, key)
    # plaintext limitations: only 26 letters. will remove any non-letter characters
    
    # clean the plaintext. remove any non-letter characters. will lowercase the plaintext
    plaintext = plaintext.gsub(/[^a-zA-Z]/, "").downcase

    # create a new string to store the ciphertext
    ciphertext = ""
    # create a variable to store the key index
    key_index = 0
    # iterate through each character in the plaintext
    plaintext.each_char do |char|
        # get the character code of the key character
        key_char_code = key[key_index].ord - 97
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
        # if the key index is equal to the length of the key, reset the key index to 0
        if key_index == key.length
            key_index = 0
        end
    end
    # return the ciphertext
    return {
        ciphertext: ciphertext
    }.to_json
  end