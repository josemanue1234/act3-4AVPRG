import React, { useState, useEffect } from 'react';
import './App.css';


const App = () => {
  const [showPreOrderForm, setShowPreOrderForm] = useState(false);
  const [showTablets, setShowTablets] = useState(false);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preOrderData, setPreOrderData] = useState({ name: '', email: '', device: '' });
  const [purchaseData, setPurchaseData] = useState({ 
    name: '', 
    email: '', 
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  // Efecto para el scroll del header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Datos de 15 tabletas con precios
  const initialDevices = [
    {
      id: 1,
      name: 'iPad Pro 2023',
      brand: 'Apple',
      price: 1099,
      image: 'https://m.media-amazon.com/images/I/81rxOSprYqL.jpg',
      specs: {
        pantalla: "12.9'' Liquid Retina XDR",
        procesador: 'M2',
        ram: '8 GB',
        almacenamiento: '256 GB',
        bateria: '10 horas',
        camara: 'Dual 12MP',
        sistema: 'iPadOS 16',
        conectividad: '5G/WiFi 6E'
      }
    },
    {
      id: 2,
      name: 'Galaxy Tab S9 Ultra',
      brand: 'Samsung',
      price: 999,
      image: 'https://m.media-amazon.com/images/I/51iQ-kBQN5L.jpg',
      specs: {
        pantalla: "14.6'' Dynamic AMOLED 2X",
        procesador: "Snapdragon 8 Gen 2",
        ram: "12 GB",
        almacenamiento: "512GB + MicroSD",
        bateria: "11200mAh con S-Pen",
        camara: "Dual 13MP + 8MP",
        sistema: "Android 14",
        conectividad: "5G/DeX"
      }
    },
    {
      id: 3,
      name: 'Surface Pro 9',
      brand: 'Microsoft',
      price: 1299,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYNtX_2qZQ5bqH_lP89LA-PBYVvuSTkMpxIA&s',
      specs: {
        pantalla: "13'' PixelSense Flow",
        procesador: "Intel Core i7-1255U",
        ram: "16 GB",
        almacenamiento: "512GB NVMe",
        bateria: "Hasta 15.5 horas",
        camara: "Windows Hello 1080p",
        sistema: "Windows 11 Pro",
        conectividad: "Thunderbolt 4"
      }
    },
    {
      id: 4,
      name: 'Lenovo Tab P12 Pro',
      brand: 'Lenovo',
      price: 799,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKvZbiMC5atK9VJIkdxMwfd_OZP_0cRbiJkQ&s',
      specs: {
        pantalla: "12.6'' OLED 120Hz",
        procesador: "Snapdragon 870",
        ram: "8 GB",
        almacenamiento: "256GB + Lápiz táctil",
        bateria: "10200mAh",
        camara: "Dual 13MP + ToF",
        sistema: "Android 13",
        conectividad: "WiFi 6"
      }
    },
    {
      id: 5,
      name: 'Xiaomi Pad 6 Max',
      brand: 'Xiaomi',
      price: 699,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz1GtlKObCsbPodvB1_glaXpOip9SX8iTL6Q&s',
      specs: {
        pantalla: "14'' 2.8K 120Hz",
        procesador: "Snapdragon 8+ Gen 1",
        ram: "12 GB",
        almacenamiento: "512GB + 16GB RAM",
        bateria: "10000mAh 67W",
        camara: "50MP Sony IMX890",
        sistema: "MIUI Pad 14",
        conectividad: "5G/Bluetooth 5.3"
      }
    },
    {
      id: 6,
      name: 'Huawei MatePad Pro 13',
      brand: 'Huawei',
      price: 899,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgLRoEzbxLHDz3jdExUR_j2PIOEkWfKlojwQ&s',
      specs: {
        pantalla: "13.2'' OLED 3:2",
        procesador: "Kirin 9000s",
        ram: "12 GB",
        almacenamiento: "512GB NM Card",
        bateria: "10050mAh SuperCharge",
        camara: "13MP Ultra-Wide",
        sistema: "HarmonyOS 3",
        conectividad: "WiFi 6+/M-Pencil"
      }
    },
    {
      id: 7,
      name: 'Amazon Fire Max 11',
      brand: 'Amazon',
      price: 229,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQyO8GP-jt5uPlDZstCwnTK-_16ei7Y37AsA&s',
      specs: {
        pantalla: "11'' 2000x1200",
        procesador: "Octa-core 2.2GHz",
        ram: "4 GB",
        almacenamiento: "64GB + microSD",
        bateria: "Hasta 14 horas",
        camara: "8MP trasera",
        sistema: "Fire OS 8",
        conectividad: "USB-C 2.0"
      }
    },
    {
      id: 8,
      name: 'Samsung Galaxy Tab A9+',
      brand: 'Samsung',
      price: 299,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJPoM2YYdMw0R4ScehnfTt1EhSgwMsoihy8w&s',
      specs: {
        pantalla: "10.4'' TFT LCD",
        procesador: "Snapdragon 695",
        ram: "6 GB",
        almacenamiento: "128GB",
        bateria: "7040mAh",
        camara: "8MP principal",
        sistema: "Android 13",
        conectividad: "LTE"
      }
    },
    {
      id: 9,
      name: 'iPad Air 5',
      brand: 'Apple',
      price: 599,
      image: 'https://m.media-amazon.com/images/I/61XZQXFQeVL._AC_SX679_.jpg',
      specs: {
        pantalla: "10.9'' Liquid Retina",
        procesador: "Apple M1",
        ram: "8 GB",
        almacenamiento: "256GB",
        bateria: "Hasta 10 horas",
        camara: "12MP Ultra Wide",
        sistema: "iPadOS 16",
        conectividad: "USB-C"
      }
    },
    {
      id: 10,
      name: 'OnePlus Pad',
      brand: 'OnePlus',
      price: 479,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ_9O7zS5Pyt1iYo-5ljWo47_XsiHI0b6OPg&s',
      specs: {
        pantalla: "11.6'' 144Hz LCD",
        procesador: "Dimensity 9000",
        ram: "8 GB",
        almacenamiento: "256GB UFS 3.1",
        bateria: "9510mAh 67W",
        camara: "13MP 4K video",
        sistema: "OxygenOS 13",
        conectividad: "5G/WiFi 6"
      }
    },
    {
      id: 11,
      name: 'Xiaomi Pad 6 Pro',
      brand: 'Xiaomi',
      price: 549,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQUPRtk0ILBqeDGXVmipdxpqPJmqb55bIPYQ&s',
      specs: {
        pantalla: "11'' 2.8K 144Hz",
        procesador: "Snapdragon 8+ Gen 1",
        ram: "12 GB LPDDR5",
        almacenamiento: "512 GB UFS 3.1",
        bateria: "8600mAh 67W Turbo",
        camara: "50MP Sony IMX766",
        sistema: "MIUI Pad 14",
        conectividad: "WiFi 6E/Bluetooth 5.3"
      }
    },
    {
      id: 12,
      name: 'OnePlus Pad Go',
      brand: 'OnePlus',
      price: 349,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShqRSCKxMVsRX3t-q8V54hIE1u-5qLkVFYXQ&s',
      specs: {
        pantalla: "10.6'' 2K 90Hz",
        procesador: "MediaTek Dimensity 900",
        ram: "8 GB LPDDR4X",
        almacenamiento: "128 GB eMMC 5.1",
        bateria: "8000mAh 33W",
        camara: "13MP + 5MP",
        sistema: "OxygenOS 13",
        conectividad: "LTE/WiFi 5"
      }
    },
    {
      id: 13,
      name: 'Amazon Fire HD 10',
      brand: 'Amazon',
      price: 199,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwu4h_T790czY6XAejKAO4TSHvEaSnV9zChg&s',
      specs: {
        pantalla: "12.4'' 1600x2560",
        procesador: "Hexa-core 2.0 GHz",
        ram: "4 GB",
        almacenamiento: "64 GB + MicroSD",
        bateria: "15 horas video",
        camara: "8MP trasera",
        sistema: "Fire OS 9",
        conectividad: "USB-C 2.0"
      }
    },
    {
      id: 14,
      name: 'Google Pixel Tablet Pro',
      brand: 'Google',
      price: 899,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_iF1fNZdXmFtjmMLZ4kdtcmDQ_hRcVrRzkQ&s',
      specs: {
        pantalla: "11'' OLED 120Hz",
        procesador: "Google Tensor G3",
        ram: "12 GB",
        almacenamiento: "256 GB UFS 4.0",
        bateria: "10000mAh 45W",
        camara: "16MP Ultra Wide",
        sistema: "Android 14",
        conectividad: "5G/WiFi 7"
      }
    },
    {
      id: 15,
      name: 'Nokia T21',
      brand: 'Nokia',
      price: 279,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDd0MkdTf1pWmCfOIXk5vf3C1_33FzXqWk_g&s',
      specs: {
        pantalla: "10.4'' 2K IPS",
        procesador: "Unisoc T612",
        ram: "6 GB",
        almacenamiento: "128 GB",
        bateria: "8200mAh 18W",
        camara: "13MP + 8MP",
        sistema: "Android 13 Go",
        conectividad: "4G LTE"
      }
    }
  ];
  const [devices] = useState(initialDevices);

  const handlePreOrderSubmit = (e) => {
    e.preventDefault();
    setShowPreOrderForm(false);
    alert(`¡Gracias por tu pre-orden ${preOrderData.name}!`);
    setPreOrderData({ name: '', email: '', device: '' });
  };

  const handlePurchaseSubmit = (e) => {
    e.preventDefault();
    setShowPurchaseForm(false);
    alert(`¡Compra exitosa ${purchaseData.name}! Tu ${selectedDevice.name} será enviado a ${purchaseData.address}`);
    setPurchaseData({ 
      name: '', 
      email: '', 
      address: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    });
  };

  const handleBuyClick = (device) => {
    setSelectedDevice(device);
    setShowPurchaseForm(true);
  };

  return (
    <div className="app">
      {/* Header con logo y botón */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          <div className="brand-container">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxN7vyX0VL5S1j-tEjeFHHhYsGR5T6Ln-3rQ&s" 
              alt="Logo" 
              className="logo" 
            />
            <div className="header-actions">
              <button 
                className="preorder-btn"
                onClick={() => setShowPreOrderForm(true)}
              >
                <i className="fas fa-shopping-cart"></i> Pre-ordenar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sección Hero */}
<section className="hero">
  <div className="hero-content">
    <div className="hero-text">
      <h1>Tabletas de Última Generación</h1>
      <p>Descubre la nueva era de la tecnología </p>
      {/* He eliminado el botón "Ver Catálogo" que estaba aquí */}
    </div>
  </div>
</section>

      {/* Formulario de Pre-orden */}
      {showPreOrderForm && (
        <div className="modal-overlay active">
          <div className="preorder-modal">
            <h2>Formulario de Pre-orden</h2>
            <form onSubmit={handlePreOrderSubmit}>
              <div className="form-group">
                <label>Nombre completo:</label>
                <input
                  type="text"
                  required
                  value={preOrderData.name}
                  onChange={(e) => setPreOrderData({...preOrderData, name: e.target.value})}
                  placeholder="Ingresa tu nombre completo"
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  required
                  value={preOrderData.email}
                  onChange={(e) => setPreOrderData({...preOrderData, email: e.target.value})}
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>
              <div className="form-group">
                <label>Selecciona tu tableta:</label>
                <select
                  required
                  value={preOrderData.device}
                  onChange={(e) => setPreOrderData({...preOrderData, device: e.target.value})}
                >
                  <option value="">Selecciona un modelo</option>
                  {devices.map(device => (
                    <option key={device.id} value={device.name}>
                      {device.name} - ${device.price}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowPreOrderForm(false)}>
                  Cancelar
                </button>
                <button type="submit">Enviar Pre-orden</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Formulario de Compra */}
      {showPurchaseForm && selectedDevice && (
        <div className="modal-overlay active">
          <div className="purchase-modal">
            <h2>Formulario de Compra</h2>
            <h3>{selectedDevice.name} - ${selectedDevice.price}</h3>
            <form onSubmit={handlePurchaseSubmit}>
              <div className="form-group">
                <label>Nombre completo:</label>
                <input
                  type="text"
                  required
                  value={purchaseData.name}
                  onChange={(e) => setPurchaseData({...purchaseData, name: e.target.value})}
                  placeholder="Ingresa tu nombre completo"
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  required
                  value={purchaseData.email}
                  onChange={(e) => setPurchaseData({...purchaseData, email: e.target.value})}
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>
              <div className="form-group">
                <label>Dirección de envío:</label>
                <textarea
                  required
                  value={purchaseData.address}
                  onChange={(e) => setPurchaseData({...purchaseData, address: e.target.value})}
                  placeholder="Calle, número, ciudad, código postal"
                />
              </div>
              <div className="form-group">
                <label>Número de tarjeta:</label>
                <input
                  type="text"
                  required
                  value={purchaseData.cardNumber}
                  onChange={(e) => setPurchaseData({...purchaseData, cardNumber: e.target.value})}
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Fecha expiración:</label>
                  <input
                    type="text"
                    required
                    value={purchaseData.expiryDate}
                    onChange={(e) => setPurchaseData({...purchaseData, expiryDate: e.target.value})}
                    placeholder="MM/AA"
                  />
                </div>
                <div className="form-group">
                  <label>CVV:</label>
                  <input
                    type="text"
                    required
                    value={purchaseData.cvv}
                    onChange={(e) => setPurchaseData({...purchaseData, cvv: e.target.value})}
                    placeholder="123"
                    maxLength="3"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowPurchaseForm(false)}>
                  Cancelar
                </button>
                <button type="submit">Confirmar Compra</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Galería de Tabletas */}
      <section className="gallery-section" id="tabletas">
        <div className="section-header">
          <h2>Nuestras Tabletas</h2>
          <button 
            className="toggle-btn"
            onClick={() => setShowTablets(!showTablets)}
          >
            {showTablets ? (
              <>
                <i className="fas fa-chevron-up"></i> Ver menos
              </>
            ) : (
              <>
                <i className="fas fa-chevron-down"></i> Ver todas
              </>
            )}
          </button>
        </div>
        
        <div className={`devices-grid ${showTablets ? 'expanded' : ''}`}>
          {devices.map((device, index) => (
            <div key={device.id} className="device-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="device-image">
                <img src={device.image} alt={device.name} />
                <div className="device-badge">{device.brand}</div>
              </div>
              <div className="device-info">
                <h3>{device.name}</h3>
                <div className="specs-grid">
                  {Object.entries(device.specs).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <span className="spec-key">{key}:</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="device-pricing">
                  <span className="price">${device.price.toLocaleString()}</span>
                  <button 
                    className="buy-btn"
                    onClick={() => handleBuyClick(device)}
                  >
                    <i className="fas fa-shopping-bag"></i> Comprar ahora
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>TechTablet</h4>
            <p>Las mejores tabletas del mercado</p>
          </div>
          <div className="footer-section">
            <h4>Contacto</h4>
            <p>contacto@techtablet.com</p>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="footer-section">
            <h4>Síguenos</h4>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 TechTablet. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;