const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

// Para declarar un test, se utiliza la palabra reservada por jest 'test'. Esto es una funcion que recibe dos parametros
//    1. Un nombre identificador para el test que describe las condiciones con las que se ejecuta
//    2. Una funcion que ejecuta el codigo a testear
test('first test', () => {});

// Utilizando la palabra describe, es posible agrupar 'test' que tengan cosas en comun
// En este caso, todos los test trabajan con el mismo metodo.
describe('absolute', () => {
  it('should return a positive number if input is positive', () => {
    // Ejecutamos el codigo a testear
    const result = lib.absolute(1);
    // Comparamos el resultado obtenido con el que deberia ser
    expect(result).toBe(1);
  });

  it('should return a positive number if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it('should return 0 if input is 0', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

// Strings
describe('greet', () => {
  it('should return the greeting message', () => {
    const result = lib.greet('Mosh');
    // Cuando se prueban strings, es importante no ser muy especifico y utilizar una de las dos estrategias siguientes.
    expect(result).toMatch(/Mosh/);
    expect(result).toContain('Mosh');
  });
});

// Arays
describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies();

    // Muy general
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    // Muy especifico
    expect(result[0]).toBe('USD');
    expect(result[1]).toBe('AUD');
    expect(result[2]).toBe('EUR');
    expect(result.length).toBe(3);

    // Adecuado
    expect(result).toContain('USD');
    expect(result).toContain('AUD');
    expect(result).toContain('EUR');

    // Correcto
    expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
  });
});

// Objects
describe('getProduct', () => {
  it('should return the product with the given id', () => {
    const result = lib.getProduct(1);

    // Espera que el objeto sea completamente igual y que contenga la misma cantidad de propiedades
    expect(result).toEqual({ id: 1, price: 10 });

    // Espera que las propiedades indicadas tengan el mismo valor
    expect(result).toMatchObject({ id: 1, price: 10 });

    // Espera que el objeto contenga una propiedad
    expect(result).toHaveProperty('id', 1);
  });
});

// Exceptions
describe('registerUser', () => {
  it('should throw if username is falsy', () => {
    // Posibles valores "falsy"
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach((a) => {
      expect(() => lib.registerUser(a)).toThrow();
    });
  });

  it('should return a user object if valid username is passed', () => {
    const result = lib.registerUser('Mosh');
    expect(result).toMatchObject({ username: 'Mosh' });
  });
});

// Mock Function
describe('applyDiscount', () => {
  it('should apply 10% discount if customer has more than 10 points', () => {
    // Crear mock de funcion externa
    db.getCustomerSync = function (customerId) {
      console.log('Fake reading customer...');
      return { id: customerId, points: 20 };
    };

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

// Mock function con Jest
describe('notifyCustomer', () => {
  it('should send an email to the customer', () => {
    // Mockear funciones con Jest
    db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    // Testear que el metodo "mail.send" haya sido llamado
    expect(mail.send).toHaveBeenCalled();

    // Testear los parametros con los que se ejecuto el metodo "mail.send"
    expect(mail.send.mock.calls[0][0]).toBe('a');
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});
