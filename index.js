
font_size = 13
character_width = 10
font_color = 'purple'
editor_background = 'black'
body_padding = 10
non-line_elements = 2

command_mode = true

body_node = getValue(document, 'body')
body_style = getValue(body_node, 'style')
setValue(body_style, 'background', editor_background)
setValue(body_style, 'color', font_color)
setValue(body_style, 'fontSize', font_size)
   
cursor_element = document.createElement('div')
body_node.appendChild(cursor_element)
cursor_style = getValue(cursor_element, 'style')
setValue(cursor_style, 'height', font_size)
setValue(cursor_style, 'width', character_width)
setValue(cursor_style, 'background', font_color)
setValue(cursor_style, 'position', 'absolute')
cursor_x = 0
cursor_y = 0
setCursor()

current_line = addLine()
body_node.addEventListener('keydown', executeAction)
body_node.addEventListener('keyup', secondaryAction)

function addLine (addAfter) {
 new_line = document.createElement('div')
 line_style = getValue(new_line, 'style')
 setValue(line_style, 'width', '100%')
 setValue(line_style, 'height', font_size)
 if (arentSame(addAfter, undefined)) {
  targetElement = getValue(body_node, addNumbers(addAfter, non-line_elements))
  targetElement.after(new_line)
  return new_line
 }
 document.appendChild(new_line)
 return new_line
}

function setCursor () {
 setValue(cursor_style, 'top', addNumbers(multiplyNumbers(font_size, cursor_y), body_padding))
 setValue(cursor_style, 'left', addNumbers(multiplyNumbers(character_width, cursor_x), body_padding))
}

function executeAction (keyEvent) {
 keyPressed = keyEvent.key
 console.log('keyPressed', keyPressed)
 if (areSame(command_mode, false)) {
  if (areSame(keyPressed, 'Enter')) {
   executeEnter()
   return
  }
  if (areSame(keyPressed, 'Backspace')) {
   executeBackspace()
   return
  }
  insertCharacter(keyPressed)
  return
 }
 executeCommand(keyPressed)
}

function getLine (lineIndex) {
 editorContent = getValue(body_node, 'children')
 targetLine = getValue(editorContent, addNumbers(lineIndex, non-line_elements))
 return targetLine
}

function executeEnter () {
 line1 = ''
 line2 = ''
 currentValue = getValue(current_line, 'textContent')
 currentSize = getValue(current_line, 'length')
 searchIndex = 0
 previousX = differenceNumbers(current_x, 1)
 while (firstGreater(currentSize, searchIndex)) {
  currentCharacter = getValue(currentValue, searchIndex)
  line1 = concatenateStrings(line1, currentCharacter)
  if (areSame(searchIndex, previousX)) {
   searchIndex = currentSize
  }
  searchIndex = addNumbers(searchIndex, 1)
 }
 searchIndex = current_x
 while (firstGreater(currentSize, searchIndex)) {
  currentCharacter = getValue(currentValue, searchIndex)
  line2 = concatenateStrings(line2, currentCharacter)
  searchIndex = addNumbers(searchIndex, 1)
 }
 newLine = addLine(current_y)
 setValue(current_line, 'innerHTML', toHTML(line1))
 setValue(newLine, 'innerHTML', toHTML(line2))
 current_y = addNumbers(current_y, 1)
 current_x = 0
 setCursor()
 current_line = newLine
}

function executeBackspace () {
 if (areSame(current_x, 0)) {
  lineValue = getValue(current_line, 'textContent')
  body_node.removeChild(current_line)
  current_y = differenceNumbers(current_y, 1)
  current_line = getLine(current_y)
  otherValue = getValue(current_line, 'textContent')
  newValue = concatenateStrings(otherValue, lineValue)
  current_x = getValue(newValue, 'length')
  setCursor()
  return
 }
 lineValue = getValue(current_line, 'textContent')
 newValue = ''
 searchIndex = 0
 lineSize = getValue(lineValue, 'length')
 previousX = differenceNumbers(current_x, 1)
 while (firstGreater(lineSize, searchIndex)) {
  currentCharacter = getValue(lineValue, searchIndex)
  if (arentSame(searchIndex, previousX)) {
   newValue = concatenateStrings(newValue, currentCharacter)
  }
  searchIndex = addNumbers(searchIndex, 1)
 }
 setValue(current_line, 'innerHTML', toHTML(newValue))
 current_x = differenceNumbers(current_x, 1)
 setCursor()
}

function toHTML (stringValue, currentIndex, currentOutput) {
 stringSize = getValue(stringValue, 'length')
 searchIndex = 0
 newValue = ''
 if (arentSame(currentIndex, undefined)) {
  searchIndex = currentIndex
  newValue = currentOutput
 }
 while (firstGreater(stringSize, searchIndex)) {
  currentCharacter = getValue(stringValue, searchIndex)
  if (areSame(currentCharacter, ' ')) {
   newValue =  concatenateStrings(newValue, space_code)
   return toHTML(stringValue, addNumbers(searchIndex, 1), newValue)
  }
  newValue =  concatenateStrings(newValue, currentCharacter)
  searchIndex = addNumbers(searchIndex, 1)
 }
 return newValue
}

function insertCharacter (keyPressed) {
 lineValue = getValue(current_line, 'textContent')
 newValue = ''
 lineSize = getValue(line_value, 'length')
 searchIndex = 0
 while (firstGreater(lineSize, searchIndex)) {
  currentCharacter  = getValue(lineValue, searchIndex)
  if (areSame(searchIndex, current_x)) {
   newValue = concatenateStrings(newValue, keyPressed)
  }
  newValue  = concatenateStrings(newValue, currentCharacter)
  searchIndex = addNumbers(searchIndex, 1)
 }
 setValue(current_line, 'innerHTML', toHTML(newValue))
 current_x = addNumbers(current_x, 1)
 setCursor()
}

function executeCommand (keyPressed) {
 if (areSame(keyPressed, 'i')) {
  command_mode = false
  return
 }
 if (areSame(keyPressed, 'j')) {
  previousY = differenceNumbers(current_y, 1)
  previousLine = getLine(previousY)
  current_line = previousLine
  current_y = previousY
  current_x = 0
  setCursor()
  return
 }
 if (areSame(keyPressed, 'k')) {
  nextY = addNumbers(current_y, 1)
  nextLine = getLine(nextY)
  current_line = nextLine
  current_y = nextY
  current_x = 0
  setCursor()
  return
 }
 if (areSame(keyPressed, 'h')) {
  if (areSame(current_x, 0)) {
   return
  }
  current_x = differenceNumbers(current_x, 1)
  setCursor()  
  return
 }
 if (areSame(keyPressed, 'l')) {
  currentSize = getValue(getValue(current_line, 'textContent'), 'length')
  if (areSame(current_x, currentSize)) {
   return
  }
  current_x = addNumbers(current_x, 1)
  setCursor()  
  return
 }
 if (areSame(keyPressed, 'g')) {
  current_line = getLine(0)
  current_x = 0
  current_y = 0
  setCursor()
  updateScroll()
  return
 }
 if (areSame(keyPressed, 't')) {
  editorSize = differenceNumbers(getValue(body_node, 'length'), non-line_elements)
  current_line = getLine(editorSize)
  current_x = 0
  current_y = editorSize
  setCursor()
  updateScroll()
  return
 }
 if (areSame(keyPressed, 's')) {
  return
 }
}

function updateScroll () {
 // complete me
}

function secondaryAction (keyEvent) {
 keyPressed = keyEvent.key
 if (areSame(keyPressed, 'Escape')) {
  command_mode = true
  return
 }
}

// utility

function arentSame (item1, item2) {
 conditionMet = item1 !== item2
 return conditionMet
}

function differenceNumbers (number1, number2) {
  outputValue = number1 - number2
  return outputValue
}

function firstGreater (number1, number2) {
 outputValue = number1 > number2
 return outputValue
}

function addNumbers (number1, number2) {
 sumValue = number1 + number2
 return sumValue
}

function areSame (item1, item2) {
 conditionMet = item1 === item2
 return conditionMet
}

function getValue (objectItem, valueKey) {
 valueValue = objectItem[valueKey]
 return valueValue
}

function setValue (objectItem, valueKey, valueValue) {
 objectItem[valueKey] = valueValue
}

function concatenateStrings (string1, string2) {
 concatenatedString = string1 + string2
 return concatenatedString
}

function toString (numberItem) {
 asString = numberItem.toString()
 return asString
}
