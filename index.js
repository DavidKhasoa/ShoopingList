function saveItems() {
  localStorage.setItem("items", JSON.stringify(items));
}

let items = JSON.parse(localStorage.getItem("items")) || [];

const form = document.getElementById("input-display")
const nameInput = document.getElementById("item-name")
const priceInput = document.getElementById("item-price")
const list = document.getElementById("item-list")
const container = document.getElementById("list-container")
const checkbox = document.getElementById("item-purchased")

function displayItem(item) {
    const li = document.createElement("li")

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = item.purchased

    const text = document.createElement("span")
    text.textContent = `${item.name}\n\n Ksh ${item.price.toFixed(2)}`;
    
    const purchasedLabel = document.createElement("span")
    purchasedLabel.textContent = "Mark as purchased"

    const editButton = document.createElement("button")
    editButton.className = "edit-btn"
    editButton.textContent = "Edit"
    saveItems()

    function updateStyle() {
        text.style.textDecoration = item.purchased ? "line-through" : "none";
    }

    checkbox.addEventListener("change", function() {
        item.purchased = checkbox.checked
        updateStyle()
    });

    editButton.addEventListener("click", function() {
        const nameField = document.createElement("input");
        nameField.type = "text";
        nameField.value = item.name
        saveItems()

        const priceField = document.createElement("input");
        priceField.type = "number"
        priceField.value = item.price;
        saveItems()

        const saveButton = document.createElement("button")
        saveButton.textContent = "Save"

        text.hidden = true
        editButton.hidden = true
        checkbox.hidden = true
        purchasedLabel.hidden = true
        text.after(nameField, priceField, saveButton);
        saveItems()

        saveButton.addEventListener("click", function() {
            const newName = nameField.value.trim()
            const newPrice = Number(priceField.value)

            if(newName === "" || priceField.value === "" || newPrice < 0) return;

            item.name = newName
            item.price = newPrice
            text.textContent = `${item.name}\n\n Ksh ${item.price.toFixed(2)}`;
            saveItems()

            nameField.remove()
            priceField.remove()
            saveButton.remove()
            text.hidden = false
            editButton.hidden = false
            checkbox.hidden = false
            purchasedLabel.hidden = false

        });
        saveItems()

    })
    saveItems()
    updateStyle();

    const removeButton = document.createElement("button")
    removeButton.className = "delete-btn"
    removeButton.textContent = "Delete"

    removeButton.addEventListener("click", function() {
        items = items.filter(i => i !== item)
        li.remove()
        removeButton.remove()
    });
    saveItems()

    li.append(text, checkbox, purchasedLabel, editButton)
    list.append(li, removeButton)
}
saveItems()
const clear = document.createElement("button")
clear.className = "clear-btn"
clear.textContent = "Clear"

function clearListContainer(container) {

    clear.addEventListener("click", function() {
        items.length = 0;
        container.innerHTML = "";
        saveItems()
    })
    saveItems()

    container.append(clear)
}
saveItems()

form.addEventListener("submit", function(event) {
    event.preventDefault()

    const item = {
        name: nameInput.value,
        price: Number(priceInput.value),
        purchased: false
    };

    items.push(item)
    saveItems()
    displayItem(item)
    form.reset()
    clearListContainer(container)
})
saveItems()

items.forEach(displayItem);