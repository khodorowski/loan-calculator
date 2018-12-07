//listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){ //a function to delay calculateResults to show gif
    //hide results
    document.getElementById('results').style.display='none';
    //show loading
    document.getElementById('loading').style.display='block';
    //set how long loading will run
    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

//calculate results function
function calculateResults(){
   //UI variables
   const amount = document.getElementById('amount');
   const interest = document.getElementById('interest');
   const years = document.getElementById('years');

   const monthlyPayment = document.getElementById('monthly-payment');
   const totalPayment = document.getElementById('total-payment');
   const totalInterest = document.getElementById('total-interest');

   const principal = parseFloat(amount.value);
   const calculatedInterest = parseFloat(interest.value) / 100 / 12;
   const calculatedPayments = parseFloat (years.value) * 12;

   //compute monthly payments
   const x = Math.pow(1 + calculatedInterest, calculatedPayments);
   const monthly = (principal * x * calculatedInterest) / (x-1);

   //validate to make sure that monthly is a finite number
   if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);//toFixed sets number of decimals I want to display
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        
        //show results
        document.getElementById('results').style.display='block';
        
        //hide loading
        document.getElementById('loading').style.display='none';
   } else { //build an alert for if the number isn't finite
        showError('Please check your numbers!');
        document.getElementById('loading').style.display='none';
        document.getElementById('results').style.display='none';
   }
}

// Show error function and create element
function showError(error){
    //create a div
    const errorDiv = document.createElement('div');
    //get parent elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //add class
    errorDiv.className = 'alert alert-danger';
    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    //insert error above heading
    card.insertBefore(errorDiv, heading);
    //clear error after 3 seconds
    setTimeout(clearError, 2000); //2000 because milliseconds
}

//create function clearError
function clearError(){
    document.querySelector('.alert').remove();
  }