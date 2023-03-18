import {Email} from '../Utils/smtp'

export default class Contact{
	constructor(){
		this.selectorName = [".nameIp" , ".emailIp" , ".message"]
		this.form = document.querySelector('.contactForm')
		this.sendMask = document.querySelector('.sending')
		this.sendStatus = document.querySelector('.mail-toast')
		this.sendText = this.sendStatus.querySelector('p')
		this.inputs = this.form.querySelectorAll('[name]') 
		this.isRequired()
		this.isEmail()
		this.submit()
	}

	validate(element , error){
		if(element.value.trim() === ""){
			error.innerHTML =  `please input ${element.name}` 
			return false
		}
		else{
			error.innerHTML = ""
			return true
		}
	}

	isRequired(){
		this.selectorName.forEach((className) => {
			let element = document.querySelector(className)			
			let error = element.previousSibling.childNodes[2]

			element.onblur = ()=>{
				this.validate(element, error)
			}
		})
		
	}

	isEmail(){
		let email = document.querySelector('.emailIp')
		let error = email.previousSibling.childNodes[2]
		let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		email.onblur = ()=>{
		if(regex.test(email.value)){
			error.innerHTML = ""
		}
		else{
			error.innerHTML =  `Please input validate email` 
		}
	}
	}

	checkInput(){
		let noError = true
		this.selectorName.forEach((className) => {
			let element = document.querySelector(className)			
			let error = element.previousSibling.childNodes[2]
			let check = this.validate(element, error)
			if(!check) noError = false
		})

		let email = document.querySelector('.emailIp')
		let errorMail = email.previousSibling.childNodes[2]
		let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		if(regex.test(email.value)){
			errorMail.innerHTML = ""
		}
		else{
			errorMail.innerHTML =  `Please input validate email` 
			noError = false
		}


		return noError
	}

	clearInput() {
		this.inputs.forEach(input =>{
			input.value = ''
		})
	}

	submit(){
		this.form.onsubmit = (e)=>{
			e.preventDefault()
			let validate = this.checkInput()
			if(validate){
				
			let formValue = Array.from(this.inputs).reduce(function(values , input){
				values[input.name] = input.value
				return values
			}, {})
			this.sendMask.classList.add('send')
			Email.send({
				Host : "smtp.elasticemail.com",
				Username : "tuananh200055@gmail.com",
				Password : "C5CB04C3B23C4C63E2678C694C79298AC65F",
				To : 'tuananh200055@gmail.com',
				From : "tuananh200055@gmail.com",
				Subject : "contact",
				Body : `
				<p>From : ${formValue.email} </p>
				<p>Name: ${formValue.name}</p>
				<p>Message: ${formValue.message}</p>
				`
			    }).then(
			      message => {
				if(message == "OK"){
					this.sendText.innerHTML = "Send mail successfully"
					this.sendStatus.classList.add("mail-success")
					this.sendStatus.classList.add('show')
				}
				else{
					this.sendText.innerHTML = "Cannot send mail !!!"
					this.sendStatus.classList.add("mail-error")
					this.sendStatus.classList.add('show')
				}
				this.sendMask.classList.remove('send')
				this.clearInput()
				setTimeout(()=>this.sendStatus.classList.remove('show'), 3000)
			}
			    );
			}
			
		}
	}
}