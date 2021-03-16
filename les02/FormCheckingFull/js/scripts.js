
window.onload = ( () => {
	const frmLogin = document.querySelector('#frmLogin');
	const name = frmLogin.querySelector('#name');
	const emmail = frmLogin.querySelector('#email');
	const birth = frmLogin.querySelector('#birth');
	const profile = frmLogin.querySelector('#profile');
	const gender = frmLogin.querySelector('#rbnsGender');
	const interest = frmLogin.querySelector('#chbsInterests');
	const msgPw = frmLogin.querySelector('.ctrlInterests .message');
	const naamPw = frmLogin.querySelector('.ctrlName .message');
	
	
	frmLogin.setAttribute('novalidate', 'novalidate');
	
	frmLogin.addEventListener('submit', function(e) 
	{
		if(emmail.value == ' ' )
		{ 
			emmail.innerHTML = 'email mag niet leeg zijn';
		}
		if(.value == ' ' )
		{ 
			emmail.innerHTML = 'email mag niet leeg zijn';
		}
	}
	);
});
