require_relative "./functions"

def playfair_cipher_controller(body, response)
  # parse body
  body = JSON.parse(body)
  mode = body["mode"]
  text = body["text"]
  key = body["key"]
  is_base64 = body["isBase64"] || false

  # handle error
  if text.nil? || key.nil? || mode.nil?
    response.status = 400
    return { error: "text and key and mode are required" }.to_json
  end

  # main action
  result_text = playfair_cipher_main(mode, text, key)

  return result_outputer(result_text, is_base64)
end

def playfair_cipher_main(mode, text, key)
  text = text.gsub(/[^a-zA-Z]/, "").downcase

  if mode == "encrypt"
    return playfair_cipher_encrypt(text, key)
  elsif mode == "decrypt"
    return playfair_cipher_decrypt(text, key)
  end
end

def playfair_cipher_encrypt(plaintext, key)
  key = transform_key(key)

  # transform plaintext into pairable letters
  plaintext = plaintext.gsub("j", "i")
  plaintext.chars.each_with_index do |letter, index|
    if plaintext[index] == plaintext[index + 1]
      plaintext.insert(index + 1, "x")
    end
  end

  if plaintext.length.odd?
    plaintext << "x"
  end

  # encrypt
  ciphertext = ""
  plaintext.chars.each_slice(2) do |pair|
    ciphertext << transform_pair(pair, key, "e")
  end

  return ciphertext
end

def playfair_cipher_decrypt(ciphertext, key)
  key = transform_key(key)

  # decrypt
  plaintext = ""
  ciphertext.chars.each_slice(2) do |pair|
    plaintext << transform_pair(pair, key, "d")
  end

  # remove padded x
  if plaintext[-1] == "x"
    plaintext.slice!(-1)
  end

  plaintext.chars.each_with_index do |letter, index|
    if letter == "x" and plaintext[index - 1] == plaintext[index + 1]
      plaintext.slice!(index)
    end
  end

  return plaintext
end

def transform_key(key)
  # transform key into unique letters
  key = key.downcase.gsub(/[^a-z]/, "")
  key = key.split("").uniq
  key.delete("j")

  # append unadded letters
  ("a".."z").each do |letter|
    key << letter unless key.include?(letter) or letter == "j"
  end

  # transform key into 5x5 table
  key_table = []
  key.each_slice(5) do |slice|
    key_table << slice
  end

  return key_table
end

def transform_pair(pair, table, mode)
  shift = mode == "e" ? 1 : -1

  pos_1 = get_table_position(pair[0], table)
  pos_2 = get_table_position(pair[1], table)

  # same row
  if pos_1[0] == pos_2[0]
    return [table[pos_1[0]][(pos_1[1] + shift) % 5], table[pos_2[0]][(pos_2[1] + shift) % 5]].join("")
  # same column
  elsif pos_1[1] == pos_2[1]
    return [table[(pos_1[0] + shift) % 5][pos_1[1]], table[(pos_2[0] + shift) % 5][pos_2[1]]].join("")
  # rectangle
  else
    return [table[pos_1[0]][pos_2[1]], table[pos_2[0]][pos_1[1]]].join("")
  end
end

def get_table_position(letter, table)
  table.each_with_index do |row, row_index|
    row.each_with_index do |col, col_index|
      if table[row_index][col_index] == letter
        return [row_index, col_index]
      end
    end
  end
end
