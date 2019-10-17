	function reCalcPmt(form,bLink){
		
		var iRate 
		var dPmt
		var lPrice
		var dAmt
		var lTerm = 30
		var mPmt 
		var tempVal =""
		var lAmt
		var strAlert = "You must indicate:  "
		var exp = new Date()
		var now = new Date()
		var blnProb = false
		
		if (form==null)return;
		
		exp.setTime(now.getTime() + (365*24*60*60*1000))
		
		//iRate= form.iRate.options[form.iRate.selectedIndex].value
		//dPmt = form.dPmt.options[form.dPmt.selectedIndex].value
		lPrice = form.lPrice.value
		iRate = form.iRate.value
		dPmt = form.dPmt.value

		//Check if any of the fields are empty
		if (iRate!="" && dPmt!="" && lPrice!=""){

			//clean the Price field - strip everything but the number
			if (lPrice.indexOf(".")!=-1)lPrice=lPrice.substring(0,lPrice.indexOf("."))
			for (var i=0;i<lPrice.length;i++){
				if (lPrice.charCodeAt(i)>45 && lPrice.charCodeAt(i)<58 && lPrice.charCodeAt(i)!=47){
					tempVal+=lPrice.charAt(i);
				}
			}
			if (lPrice != tempVal)form.lPrice.value=makeMoney(parseFloat(tempVal));
			lPrice = tempVal
			tempVal = ""
			
			//clean the Interest Rate field - strip everything but the number
			for (var i=0;i<iRate.length;i++){
				if (iRate.charCodeAt(i)>45 && iRate.charCodeAt(i)<58 && iRate.charCodeAt(i)!=47){
					tempVal+=iRate.charAt(i);
				}
			}
			if (iRate != tempVal)form.iRate.value=tempVal;
			iRate = tempVal
			tempVal = ""
			
			//clean the Down Payment field - strip everything but the number
			for (var i=0;i<dPmt.length;i++){
				if (dPmt.charCodeAt(i)>45 && dPmt.charCodeAt(i)<58 && dPmt.charCodeAt(i)!=47){
					tempVal+=dPmt.charAt(i);
				}
			}
			if (dPmt != tempVal)form.dPmt.value=tempVal;
			dPmt = tempVal
			tempVal = ""
			
			//cookie in the interest rate and down payment
			document.cookie = "MortCalc=iRate\=" + iRate + "&dPmt\=" + dPmt + "; expires=" + exp.toGMTString() + "; path=/"
			
			//convert to floats
			iRate= parseFloat(iRate)
			dPmt = parseFloat(dPmt)
			lPrice = parseFloat(lPrice)
			
			//Make sure percentages are not greater than 100
			if (iRate>100.0){
				alert("You have entered an invalid interest rate")
				form.iRate.value=""
				form.iRate.focus()
				blnProb=true
			}
			
			if (dPmt>100.0 && !blnProb){
				if(confirm("You have entered a down payment percentage greater than 100%.\n\nIs " + makeMoney(dPmt) + " the amount that you wish to use as your down payment?")){
					dAmt=dPmt
					dPmt=(dPmt/lPrice)*100
					//round this number to two decimal places
					dPmt=Math.round(dPmt*Math.pow(10,2))/Math.pow(10,2)
					//re-cookie in the revised interest rate and down payment
					document.cookie = "MortCalc=iRate\=" + iRate + "&dPmt\=" + dPmt + "; expires=" + exp.toGMTString() + "; path=/"
					form.dPmt.value=dPmt
				}else{
					form.dPmt.value=""
					form.dPmt.focus()
					blnProb=true
				}
			}else{
				dAmt=Math.round(dPmt*lPrice/100)
			}
			
			if (!blnProb){
				//Indicate the dollar amount
				dAmount.innerHTML="==> " + makeMoney(dAmt)
							
				//Convert Percentages to Numbers
				iRate= iRate/100
				dPmt = dPmt/100
					
				//get Loan Amount
				lAmt = lPrice - dPmt*lPrice

				//alright we have valid numbers - lets calculate the monthly payment
				mPmt = makeMoney(PV(lAmt, iRate, lTerm))
				
				form.mPmt.value=mPmt
			}
		}else if(bLink){
			if(lPrice==""){
				strAlert+="A List Price";
				if(dPmt=="")strAlert+=", " + "A Down Payment";
				if(iRate=="")strAlert+=", " + "An Interest Rate";
			}else{
				if(dPmt=="")strAlert+="A Down Payment"+", ";
				if(iRate=="")strAlert+="An Interest Rate";
			}
			alert(strAlert)
		}
		
	}
	
	function reCalcPmt2(form){
		var iRate 
		var dPmt, dPmtDollars
		var lPrice
		var lTerm = 30
		var mPmt 
		var tempVal =""
		var lAmt
		var strAlert = "You must indicate:  "
		var exp = new Date()
		var now = new Date()
		var blnProb = false
		var blnCalculate = false
		var blnDisplayAlerts = false
		
		if (form==null)return;
		
		exp.setTime(now.getTime() + (365*24*60*60*1000))
		
		lPrice = form.lPrice.value
		iRate = form.iRate.value
		dPmt = form.dPmt.value
		dPmtDollars = form.dPmtDollars.value
		
		if (dPmtDollars != "" && dPmt != ""){
		    form.dPmt.value = "";  // If user provides dollars and %, clear out the %.
		    dPmt = ""
		}

		//Check if any of the fields are empty
		if (iRate!="" && (dPmt!="" || dPmtDollars!="") && lPrice!=""){
		    blnCalculate = true
		}
		blnDisplayAlerts = blnCalculate

		//clean the Price field - strip everything but the number
		if (lPrice.indexOf(".")!=-1)lPrice=lPrice.substring(0,lPrice.indexOf("."))
		tempVal = CleanFieldVal(lPrice)
		if (lPrice != tempVal) {
		    if (isNaN(parseFloat(tempVal))){
		        if (blnDisplayAlerts) {
			        alert("You have entered an invalid Home Price.")
			        form.lPrice.value=""
			        form.lPrice.focus()
			    }
			    blnProb=true
			}
		    else {
		        form.lPrice.value=makeFormattedNumber(parseFloat(tempVal));
		        lPrice = tempVal;
		    }
		}
		else if (!isNaN(parseFloat(tempVal))){
			form.lPrice.value=makeFormattedNumber(parseFloat(tempVal));
        }
		
		//clean the Interest Rate field - strip everything but the number
		tempVal = CleanFieldVal(iRate)
		if (iRate != tempVal)form.iRate.value=tempVal;
		iRate = tempVal
		
		//clean the Down Payment Dollars field - strip everything but the number
		tempVal = CleanFieldVal(dPmtDollars)
		if (dPmtDollars != tempVal){
		    if (isNaN(parseFloat(tempVal))){
		        if (blnDisplayAlerts) {
			        alert("You have entered an invalid Down Payment ($).")
			        form.dPmtDollars.value=""
			        form.dPmtDollars.focus()
			    }
			    blnProb=true
		    }
		    else {
		        form.dPmtDollars.value=makeFormattedNumber(parseFloat(tempVal));
		        dPmtDollars = tempVal
		    }
		}
		else if (!isNaN(parseFloat(tempVal))){
	        form.dPmtDollars.value=makeFormattedNumber(parseFloat(tempVal));
	    }
		
		//clean the Down Payment field - strip everything but the number
		tempVal = CleanFieldVal(dPmt)
		if (dPmt != tempVal)form.dPmt.value=tempVal;
		dPmt = tempVal
		
		if (blnCalculate) {
			//cookie in the interest rate and down payment
			document.cookie = "MortCalc=iRate\=" + iRate + "&dPmt\=" + dPmt + "; expires=" + exp.toGMTString() + "; path=/"
			
			//convert to floats
			iRate= parseFloat(iRate)
			dPmt = parseFloat(dPmt)
			dPmtDollars = parseFloat(dPmtDollars)
			lPrice = parseFloat(lPrice)
			
			//Make sure percentages are not greater than 100
			if (iRate>100.0){
			    if (blnDisplayAlerts) {
				    alert("You have entered an invalid interest rate.")
				    form.iRate.value=""
				    form.iRate.focus()
				}
				blnProb=true
			}
			
			if (!blnProb) {
			    if (!isNaN(dPmtDollars)){ // Convert dollars to percent
					dPmt=(dPmtDollars/lPrice)*100
					//round this number to two decimal places
					dPmt=Math.round(dPmt*Math.pow(10,2))/Math.pow(10,2)
			    }
			}
						
			if (!blnProb){						
				//Convert Percentages to Numbers
				iRate= iRate/100
				dPmt = dPmt/100
					
				//get Loan Amount
				lAmt = lPrice - dPmt*lPrice

				//alright we have valid numbers - lets calculate the monthly payment
				mPmt = PV(lAmt, iRate, lTerm)
				if (isNaN(mPmt))
				    form.mPmt.value = "0"
				else
				    form.mPmt.value = makeFormattedNumber(mPmt)
			}
		}
			
		if (!blnCalculate) {
		    form.mPmt.value = ""
		}
		
	}
	
	// Charcodes:  46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57
	//             are  ./0123456789
	function CleanFieldVal(fld){
	    var tempVal = ""
	    
		for (var i=0;i<fld.length;i++){
		    if (fld.charCodeAt(i)>45 && fld.charCodeAt(i)<58 && fld.charCodeAt(i)!=47){
			    tempVal+=fld.charAt(i);
			}
		}
        return tempVal;
	}
	
	function PV(loan_amount, rate, years) {
		var payment=0;
		var payment_count = years * 12;
		payment = loan_amount / ((1-(1/Math.pow((1+(rate/12)),payment_count)))/(rate/12));
		payment = parseInt(payment);
		return payment;
	}

	function makeMoney (number) {
	    return "$" + makeFormattedNumber(number)
	}
	
	function makeFormattedNumber (number) {
		var sStr = "";
		sStr += number;
		var numberval = "";
		var i;
		for (i=0; i < sStr.length; i++) {
			j=i+1;
			numberval += sStr.substring(i,j);
			if (number == Math.round(number)) { 
				pos = sStr.length-j;
			}
			else {
				pos = sStr.length-3-j;
			}
			tmp = Math.round(pos/3);
			if (pos == tmp*3 && pos != 0) numberval+=",";
		}
		return numberval;
	}