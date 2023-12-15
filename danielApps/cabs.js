window.onload = () => {
    const numbers = ['ADOBO', 'LINAT-AN', 'ITLOG', 'PAKBIT', 'EGG/RICE', 'RICE', 'COKE', 'RC', 'PEPSI'];
    let newBoxCount = 0; // Track the number of new boxes created
  
    for (let i = 0; i < numbers.length; i++) {
      const box = document.createElement('div');
      box.className = 'box';
      box.textContent = numbers[i];
  
      // Add a click event listener to each box
      box.addEventListener('click', () => {
        createNewBox(i, numbers[i]); // Pass the index and number to the function
      });
  
      document.body.appendChild(box);
  
      if ((i + 1) % 3 === 0) {
        document.body.appendChild(document.createElement('br'));
      }
    }
  
    function createNewBox(index, number) {
      const newBox = document.createElement('div');
      newBox.className = 'new-box';
      newBox.textContent = `index {${index}}, ${number}`; // Fix the string interpolation syntax
  
      // Add a click event listener to the new box for removal
      newBox.addEventListener('click', () => {
        removeNewBox(newBox, index);
      });
  
      document.body.appendChild(newBox);
  
      newBoxCount++;
  
      // Check if a new row should be created after every third new box
      if (newBoxCount % 3 === 0) {
        document.body.appendChild(document.createElement('br'));
      }
    }
  
    function removeNewBox(box, index) {
      box.parentNode.removeChild(box);
      newBoxCount--;
  
      // Update the indices of the remaining boxes
      const remainingBoxes = document.querySelectorAll('.new-box');
      remainingBoxes.forEach((box, i) => {
        const newIndex = index + i;
        const number = parseInt(box.textContent.match(/number (\d+)/)[1]); // Extract the number from the text
        box.textContent = `index {${newIndex}}, ${number}`; // Fix the string interpolation syntax
      });
  
      // Optionally, you can remove the line break if the last new box in the row is removed
      if (newBoxCount % 3 === 2) {
        const breaks = document.querySelectorAll('br');
        const lastBreak = breaks[breaks.length - 1];
        lastBreak.parentNode.removeChild(lastBreak);
      }
    }
  };
  