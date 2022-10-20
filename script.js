const dataBase = {

    1: {

        id: 1,
        name: 'apple',
        price: 23,
        url: 'apple.png'

    },

    2: {

        id: 2,
        name: 'onion',
        price: 32,
        url: 'onion.png'

    },

    3: {

        id: 3,
        name: 'melon',
        price: 40,
        url: 'melon.png'

    },

    4: {

        id: 4,
        name: 'bread',
        price: 100,
        url: 'bread.png'

    },

    5: {

        id: 5,
        name: 'orange',
        price: 5,
        url: 'orange.png'

    },

    6: {

        id: 6,
        name: 'meat',
        price: 254,
        url: 'meat.png'

    }

};

const available = document.querySelector('main .available');
const preview = document.querySelector('main .toBuy');
preview.classList.add('hidden');
let buying = {};

const totalRender = () => {

    const totalParagraph = document.querySelector('.totalPrice');
    const search = document.querySelectorAll('.price').length;
    const index = document.querySelectorAll('.price')[search - 1];
    const total = Number(index.price);

    if (total === 0) {

        totalParagraph.remove();
        index.remove();
        preview.classList.add('hidden');

    } else {

        preview.classList.remove('hidden');

    };

};

const deleteButtonFunction = e => {

    const button = e.target;
    const buttonMark = parseInt(button.mark);
    const buttonParent = button.parentNode;

    buying = buying.filter(clean => {

        return clean !== buttonMark

    });

    //buttonParent.style.transition = 'opacity 1s ease';
    //buttonParent.style.opacity = 0;

    buttonParent.classList.add('deleteAnimate');

    setTimeout(() => {

        buttonParent.remove();
        render(buying);

        totalRender();

    }, 1000);

};

const render = array => {

    const fragment = document.createDocumentFragment();
    let totalPrice = 0;

    const selected = [...new Set(array)];

    selected.forEach(one => {

        const transfer = dataBase.filter(data => {

            return data.id === one

        });
        const currentItem = transfer[0];

        const units = array.reduce((total, itemId) => {


            return itemId === one ? total += 1 : total;

        }, 0);

        const item = document.createElement('article');

        const deleteButton = document.createElement('button');
        deleteButton.mark = `${currentItem.id}`
        deleteButton.type = 'button';
        deleteButton.className = 'deleteButton';
        deleteButton.innerText = '🗑';
        deleteButton.addEventListener('click', deleteButtonFunction);
        item.appendChild(deleteButton)

        const paragraph = document.createElement('p');
        paragraph.innerText = `${units} X ${currentItem.name}`;
        item.appendChild(paragraph);

        const priceTotal = units * currentItem.price;
        totalPrice += priceTotal;
        const price = document.createElement('span');
        price.innerText = `${priceTotal}$`;
        price.className = 'price';
        item.appendChild(price);

        const extra = document.createElement('div');
        extra.className = 'extra';
        item.appendChild(extra);

        fragment.appendChild(item);

    });

    preview.innerHTML = '';
    const totalArticle = document.createElement('article');
    totalArticle.className = 'totalPrice';
    const total = document.createElement('p');
    total.innerText = `total`
    totalArticle.appendChild(total)

    const totalPriceSpan = document.createElement('span');
    totalPriceSpan.price = `${totalPrice}`;
    totalPriceSpan.className = `price`;
    totalPriceSpan.innerText = `${totalPrice}$`;
    totalArticle.appendChild(totalPriceSpan)

    fragment.appendChild(totalArticle)

    preview.appendChild(fragment);

};

const addButtonFunction = e => {

    const button = e.target;
    buying.push(parseInt(button.id));

    render(buying);
    totalRender();

};

for (let i = 0; i < 10000; i++) {

    if (!dataBase[i]) {

        continue;

    } else {

        const currentItem = dataBase[i];
        const fragment = document.createDocumentFragment();
        const item = document.createElement('article');

        const div = document.createElement('div');
        div.className = 'imageContainer';
        item.appendChild(div);

        const img = document.createElement('img');
        img.src = ('/img/').concat(currentItem.url);
        img.alt = currentItem.name;
        img.className = 'productImage';
        div.appendChild(img);

        const paragraph = document.createElement('p');
        paragraph.innerText = currentItem.name;
        item.appendChild(paragraph);

        const price = document.createElement('span');
        price.innerText = `${currentItem.price}$`;
        price.className = 'price';
        item.appendChild(price);

        const addButton = document.createElement('button');
        addButton.id = `${currentItem.id}`;
        addButton.type = 'button';
        addButton.className = 'addButton';
        addButton.innerText = '+';

        addButton.addEventListener('click', addButtonFunction);

        item.appendChild(addButton);

        fragment.appendChild(item);
        available.appendChild(fragment);
    }
};