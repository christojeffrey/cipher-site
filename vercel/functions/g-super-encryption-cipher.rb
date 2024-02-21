require_relative "./functions"
require_relative "./c-vigenere-extended-cipher"

def super_encryption_cipher_controller(body)
    # parse body
    body = JSON.parse(body)
    mode = body["mode"]
    text = body["text"]
    key = body["key"]
    isBase64 = body["isBase64"] || false

    # handle error
    if text.nil? || key.nil? || mode.nil?
        response.status = 400
        return { error: "text and key and mode are required" }.to_json
    end


    # main action
    

    # reserse the order of the cipher based on the mode. encrypt = transposition then vigenere. decrypt
    if(mode == "encrypt")
        result_text = vigenere_extended_cipher_main(mode, text, key)
        
        result_text = transposition_cipher_main(mode, result_text, key)
    else
        result_text = transposition_cipher_main(mode, text, key)

        result_text = vigenere_extended_cipher_main(mode, result_text, key)
    end
        



    

    return result_outputer(result_text, isBase64)
end

def transposition_cipher_main(mode, text, key)
    # this can break, because there's a default trailing space. so far I don't think there's a way around this. 
    # limitation: handle ascii characters   

    # will return string.
    if mode == "encrypt"
        return transposition_cipher_encrypt(text, key)
    elsif mode == "decrypt"
        return transposition_cipher_decrypt(text, key)
    end
end

def transposition_cipher_encrypt(plaintext, key)
    # created based on class. there's a variation, from geeksforgeeks.
    # https://www.geeksforgeeks.org/columnar-transposition-cipher/

    # length of the key
    key_length = key.length
    # create a 2D array to store the plaintext. the column is based on the key length
    # the row is based on the length of the plaintext divided by the key length
    
    # if there's a remainder, add space
    
    row = (plaintext.length / key_length).ceil
    col = key_length
    two_d_array = Array.new(row) { Array.new(col, " ") }
    # add plain text to the 2D array
    index = 0
    for i in 0..row - 1
        for j in 0..col - 1
            if index < plaintext.length
                two_d_array[i][j] = plaintext[index]
                index += 1
            end
        end
    end

    # create a new string to store the cipher text
    cipher_text = ""
    # iterate through each character in the key
    for j in 0..col - 1
        for i in 0..row - 1
            # add the character in the 2D array to the cipher text
            cipher_text += two_d_array[i][j]
        end
    end

    # return the cipher text
    return cipher_text

end
def transposition_cipher_decrypt(ciphertext, key)
    # created based on class. there's a variation, from geeksforgeeks.
    # https://www.geeksforgeeks.org/columnar-transposition-cipher/

     # length of the key
     key_length = key.length
     # create a 2D array to store the plaintext. the column is based on the key length
     # the row is based on the length of the plaintext divided by the key length
     
     # if there's a remainder, add space
     
     row = (ciphertext.length / key_length).ceil
     col = key_length
     two_d_array = Array.new(row) { Array.new(col, " ") }
     # add plain text to the 2D array
     index = 0
     for j in 0..col - 1
        for i in 0..row - 1
             if index < ciphertext.length
                 two_d_array[i][j] = ciphertext[index]
                 index += 1
             end
         end
     end
 
     # create a new string to store the cipher text
     plaintext = ""
     # iterate through each character in the key
     for i in 0..row - 1
        for j in 0..col - 1
             # add the character in the 2D array to the cipher text
             plaintext += two_d_array[i][j]
         end
     end
 
     # return the cipher text
     return plaintext
end