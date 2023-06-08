import React from 'react';

const ShowMenu = ({ menu }) => {

    const menuData = {
        name: 'Sample Menu',
        image: 'menu-image.jpg',
        categories: [
          {
            id: 1,
            name: 'Appetizers',
            dishes: [
              { id: 1, name: 'Dish 1', description: 'Description of Dish 1' },
              { id: 2, name: 'Dish 2', description: 'Description of Dish 2' },
            ],
          },
          {
            id: 2,
            name: 'Main Course',
            dishes: [
              { id: 3, name: 'Dish 3', description: 'Description of Dish 3' },
              { id: 4, name: 'Dish 4', description: 'Description of Dish 4' },
            ],
          },
        ],
      };
      menu = menuData;
  return (
    <div>
      <h2>{menu.name}</h2>
      <img src={menu.image} alt={menu.name} />

      {menu.categories.map((category) => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          <ul>
            {category.dishes.map((dish) => (
              <li key={dish.id}>
                <h4>{dish.name}</h4>
                <p>{dish.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ShowMenu;
