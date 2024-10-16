// src/utils/generateTicket.js
const generateTicket = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  
 /* if (paymentData.status === 'approved') {
    const ticketCode = generateTicket(5);
    // Guardar el ticket en la base de datos
    await Transaction.update({ ticketCode }, { where: { id: existingPayment.id } });
    
    // Opcional: Enviar el ticket al usuario por correo electrónico
  }*/
  

  module.exports = generateTicket;
  