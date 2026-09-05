const catItems = [
  {
    cat_id: 1,
    name: 'Milo',
    birthdate: '2022-05-15',
    weight: 4.5,
    owner: 'Anamol',
  },
  {
    cat_id: 2,
    name: 'Luna',
    birthdate: '2021-08-20',
    weight: 3.8,
    owner: 'Manik',
  },
];

const listAllCats = () => {
  return catItems;
};

const findCatById = (id) => {
  return catItems.find((item) => item.cat_id == id);
};

const addCat = (cat) => {
  const newId = catItems.length + 1;

  const newCat = {
    cat_id: newId,
    name: cat.name,
    birthdate: cat.birthdate,
    weight: cat.weight,
    owner: cat.owner,
  };

  catItems.push(newCat);

  return newCat;
};

export {listAllCats, findCatById, addCat};
