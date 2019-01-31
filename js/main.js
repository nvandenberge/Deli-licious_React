const form = document.getElementById('menu');
const radioButtons = document.getElementById('radioButtons');
const checkboxButtons = document.getElementById('checkboxButtons');
const checked = element => element.checked === true;
const byType = ({ type }) => type === 'radio' ? type === 'radio' : type === 'checkbox';
    //destructuring object in places
    //essentially and if/else statement
    //if true, type = radio
    //if false, assign checkbox to the type

function renderRadio(radioData) {
  const {
    bread,
    cheese,
    meats
  } = radioData;
      //Object destructuring to get individual properties
      //This is the same as 'const bread=radioData.bread'

  return `
      <ul id='radioOutput'>
      <h2 id ='bread-select'>Bread</h2>
      <li>${bread ? bread : ''}</li>
      <h2 id ='cheese-select'>Cheese</h2>
      <li>${cheese ? cheese : ''}</li>
      <h2 id ='meat-select'>Meat</h2>
      <li>${meats ? meats : ''}</li>
    </ul>
  `
}
    //Could use 'radioData.bread' in template string, but messy
    //Above generates headers and list items for selected radio buttons
    //If true - display value
    //If false - display blank
    //Expression operator (?) is used so that it does not return 'undefined' (falsey)

function addRadio() {
  const radios = Array.from(form.elements).filter(byType);
      //'Array.from(form.elements)' creates array from elements in form
      //'Array.from' because 'form.elemtns' returns an HTMLFormControlsCollection which we canNOT filter on directly
      //const byType = ({ type }) => type === 'radio' ? type === 'radio' : type === 'checkbox';
  const checkedRadio = radios.filter(checked);
      //const checked = element => element.checked === true;
      //filter for any selected radio button
  let radioData = {};
  checkedRadio.forEach(radio => {
     radioData[radio.name] = radio.value
      //Object where name=key and value=value
  })
  radioButtons.innerHTML = renderRadio(radioData);
      //const radioButtons = document.getElementById('radioButtons');
}

document.getElementById('radios').addEventListener('change', addRadio);
    //Simplied from adding to all radios.
    //This will bind it to parent, which is #radios.
    //Taking advantage of bubbling by stopping at parent

function renderCheckbox({
  toppings = [],
  condiments = [],
  sides = []
}) {
    //Same as `renderRadio` except were destructing right as we pass it.

  return `
      <ul id='checkboxOutput'>
      <h2 id ='toppings-select'>Toppings</h2>
      ${toppings.map(topping => `<li>${topping}</li>`).join('')}
      <h2 id ='condiments-select'>Condiments</h2>
      ${condiments.map(condiment => `<li>${condiment}</li>`).join('')}
      <h2 id ='sides-select'>Sides(2)</h2>
      ${sides.map(side => `<li>${side}</li>`).join('')}
    </ul>
    `;
}


function addCheckbox(event) {
  const checkboxes = Array.from(form.elements).filter(byType);
  const checkedBoxes = checkboxes.filter(checked);
  const sideItems = document.querySelectorAll('.sideItem:checked');
  if (sideItems.length > 2) {
    alert('You may only select a maximum of 2 sides')
    event.target.checked = false;
  } else {
    const checkboxData = {};
    checkedBoxes.forEach(checkbox => {
      if (checkboxData[checkbox.name]) {
        checkboxData[checkbox.name].push(checkbox.value);
        //On first checkbox iteration it will run once and hit the 'else' and assign the key the selected value into an array
      } else {
        checkboxData[checkbox.name] = [checkbox.value];
      }
    });
    checkboxButtons.innerHTML = renderCheckbox(checkboxData);
  }
}
    // We add [] around 'checkbox.value' to pass value into an array since more than 1 value
    //Because it is a forEach function, on the second click it will run twice...
    //^ first it will hit the else, second time it will be true and hit the if statment and .push()

    // document.querySelectorAll('[type="checkbox"]').forEach(element => element.addEventListener('change', addCheckbox));

document.getElementById('checkboxes').addEventListener('change', addCheckbox);

    //Simplied from adding an event listener to all type=checkboxes. This will bind it to parent, which is #checkboxes
