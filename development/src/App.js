import React, { Component } from 'react';
import logo from './img/logo.png';
import productImg from './img/product1.jpg';

const products = [
  {
    id: 0,
    img: productImg,
    title: 'Kansas',
    price: '1$',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, perspiciatis necessitatibus delectus, corrupti eveniet autem maiores quibusdam atque dicta, iusto vitae possimus quam dolorum voluptates. Reprehenderit cumque tenetur iusto autem!'
  },
  {
    id: 1,
    img: productImg,
    title: 'Chicago',
    price: '2$',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, perspiciatis necessitatibus delectus, corrupti eveniet autem maiores quibusdam atque dicta, iusto vitae possimus quam dolorum voluptates. Reprehenderit cumque tenetur iusto autem!'
  },
  {
    id: 2,
    img: productImg,
    title: 'New York',
    price: '2.5$',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, perspiciatis necessitatibus delectus, corrupti eveniet autem maiores quibusdam atque dicta, iusto vitae possimus quam dolorum voluptates. Reprehenderit cumque tenetur iusto autem!'
  },
  {
    id: 3,
    img: productImg,
    title: 'Atlanta',
    price: '3$',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, perspiciatis necessitatibus delectus, corrupti eveniet autem maiores quibusdam atque dicta, iusto vitae possimus quam dolorum voluptates. Reprehenderit cumque tenetur iusto autem!'
  }
];

class Header extends Component {
  addProduct() {
    document.querySelector('.modal').classList.add('modal--is-active');
  }

  render() {
    return (
      <header className="header">
        <div>
            <a href="#" className="header__home-link">
                <img src={logo} alt="Logo" className="header__logo" />
            </a>

            <button className="header__button" type="button">Crud</button>
        </div>

        <button className="header__link" type="button" onClick={this.addProduct}>Add hot-dog</button>
      </header>
    );
  }
}

class Title extends Component {
  render() {
    return (
      <h1 className="catalog__title">All hot-dogs</h1>
    );
  }
}

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
  }

  handleEdit = () => {
    this.setState({
      edit: true
    })
  }

  render() {
    let productInner = null;
    if(this.state.edit) {
      productInner =  <React.Fragment>
                        <input className="product__input" defaultValue={this.props.img} onChange={this.handleChange} />
                        <input className="product__input" defaultValue={this.props.title} onChange={this.handleChange} />
                        <input className="product__input" defaultValue={this.props.price} onChange={this.handleChange} />
                        <textarea className="product__input product__textarea" defaultValue={this.props.description} onChange={this.handleChange} />
                        <button className="product__button product__button--is-edit" type="button" onClick={this.props.onUpdate}>Upgrade</button>
                        <button className="product__button product__button--is-edit" type="button" onClick={this.props.onDelete}>Delete</button>
                      </React.Fragment>
    } else {
      productInner =  <React.Fragment>
                        <div className="product__title">{this.props.title}</div>
                        <div className="product__price">{this.props.price}</div>
                        <p className="product__description">{this.props.description}</p>
                        <button className="product__button" type="button" onClick={this.handleEdit}>Edit</button>
                      </React.Fragment>
    }

    return (
      <div className="product">
          <img src={this.props.img} alt="Product" className="product__img" />
          {productInner}
      </div>
    );
  }
}

class ProductsGrid extends Component {
  render() {
    let onProductDelete = this.props.onProductDelete;

    return (
      <div className="catalog__container">
        {
          this.props.products.map((product) => {
            return (
              <Product 
                key={product.id} 
                title={product.title}
                price={product.price} 
                img={product.img}
                description={product.description}
                products={this.props.products}
                onDelete={onProductDelete.bind(null, product)}
              />
            )
          })
        }
      </div>
    );
  }
}

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
      title: '',
      price: '',
      description: ''
    };
  }

  closePopup() {
    document.querySelector('.modal').classList.remove('modal--is-active');
  }

  handleProductAdd = () => {
    let newProduct = {
      id: Date.now(),
      img: this.state.img,
      title: this.state.title,
      price: this.state.price + '$',
      description: this.state.description
    }

    for(let key in newProduct) {
      if(key !== 'id') {
        if(newProduct[key].trim() === '') {
          alert('Error: One of the fields is empty');
          return;
        }

        switch(key) {
          case 'title':
            for(let i = 0; i < this.props.products.length; i++) {
                if(this.props.products[i][key].toLowerCase() === newProduct[key].toLowerCase()) {
                  alert(`Error: ${newProduct[key]} name already exist. Please change name.`);
                  return;
                }
            }
            break;
          default:
        }
      }
    }

    this.props.onProductAdd(newProduct);
    this.setState({ 
      img: '',
      title: '',
      price: '',
      description: ''
    });

    this.closePopup();
  }

  handleTextChange = (event) => {
    this.setState({ [event.target.dataset.state]: event.target.value });
  }

  render() {
    return (
      <div className="modal">
        <div className="modal__inner">
            <h3 className="modal__title">Add new hot-dog</h3>

            <form className="modal__form">
                <input type="text" className="modal__input" name="name" placeholder="Name" data-state="title" value={this.state.title}
                    onChange={this.handleTextChange} />
                <input type="number" className="modal__input" name="price" placeholder="Price" data-state="price" value={this.state.price}
                    onChange={this.handleTextChange} />
                <input type="text" className="modal__input" name="description" placeholder="Description" data-state="description" value={this.state.description}
                    onChange={this.handleTextChange} />
                <input type="text" className="modal__input" name="image" placeholder="Image" data-state="img" value={this.state.img}
                    onChange={this.handleTextChange} />

                <div className="modal__button-container">
                    <button type="button" className="modal__button" onClick={this.closePopup}>No, thanks</button>
                    <button type="button" className="modal__button" onClick={this.handleProductAdd}>Add</button>
                </div>
            </form>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: products
    };
  }

  handleProductDelete = (product) => {
    let productId = product.id;
    let newProducts = this.state.products.filter(function(product) {
        return product.id !== productId;
    });

    this.setState({ products: newProducts });
  }

  productAdd = (newProduct) => {
    let newProducts = this.state.products.slice();
    newProducts.unshift(newProduct);
    this.setState({ products: newProducts });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main className="main">
          <section className="catalog">
            <Title />
            <ProductsGrid products={this.state.products} onProductDelete={this.handleProductDelete} />
          </section>
        </main>
        <Modal onProductAdd={this.productAdd} products={this.state.products} />
      </div>
    );
  }
}

export default App;
