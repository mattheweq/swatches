function createElementWithClass(tagName, classes){
  const el = document.createElement(tagName)
  el.setAttribute('class', classes)

  return el
}

function createItem(colour) {
  const elmItem = createElementWithClass('div', 'palette__item');
  const elmColour = createElementWithClass('div', 'palette__colour');
  const elmDesc = createElementWithClass('div', 'palette__desc');
  const elmMessage = createElementWithClass('div', 'palette__message');

  elmColour.style.backgroundColor = colour;
  elmDesc.textContent = colour;
  elmMessage.textContent = "Copied!";
  elmMessage.style.opacity = '0'; // Hide the message initially

  elmItem.appendChild(elmColour);
  elmItem.appendChild(elmMessage);
  elmColour.appendChild(elmDesc);

  elmItem.addEventListener('click', () => {
    navigator.clipboard.writeText(elmColour.textContent)
      .then(() => {
        elmMessage.style.opacity = '1'; // Show the message
        setTimeout(() => {
          elmMessage.style.opacity = '0'; // Hide the message after a delay
        }, 1500);
      })
      .catch(err => {
        console.error('Failed to copy text to clipboard:', err);
      });
  });

  return elmItem;
}

const paletteContainer = document.querySelector('.container');

fetch('data/colour.json')
  .then(res => res.json())
  .then(colourList => {
    for (const { desc, colour } of colourList) {
      paletteContainer.appendChild(createItem(colour, desc));
    }
  });
