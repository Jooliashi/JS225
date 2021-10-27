function createInvoice(services = {}) {
  return {
    phone: services.phone || 3300,
    internet: services.internet || 5000,
    payments: [],
    total() {
      return this.phone + this.internet;
    },
    addPayment(payment) {
      this.payments.push(payment);
    },
    addPayments(payment) {
      this.payments = this.payments.concat(payment);
    },
    amountDue(){
      function paymentTotal(payments) {
        let total = 0;
        let i;
      
        for (i = 0; i < payments.length; i += 1) {
          total += payments[i].total();
        }
      
        return total;
      }
      
      return this.total() - paymentTotal(this.payments);
    },
  };
}


function invoiceTotal(invoices) {
  let total = 0;
  let i;

  for (i = 0; i < invoices.length; i += 1) {
    total += invoices[i].total();
  }

  return total;
}

function createPayment(services = {}) {
  let payment = {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,
  };
  payment.total = function() {
    return this.amount || (this.phone + this.internet);
  };

  return payment;
}

function paymentTotal(payments) {
  let total = 0;
  let i;

  for (i = 0; i < payments.length; i += 1) {
    total += payments[i].total();
  }

  return total;
}

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({
  amount: 2000,
});

let payment2 = createPayment({
  phone: 1000,
  internet: 1200,
});

let payment3 = createPayment({
  phone: 1000,
});

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());       // this should return 0