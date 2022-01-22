console.log("Hello World");

// Get all the stars
const one = document.getElementById("first");
const two = document.getElementById("second");
const three = document.getElementById("third");
const four = document.getElementById("fourth");
const five = document.getElementById("fifth");

// console.log(five);

const form = document.querySelector('.rate-form');
const confirmBox = document.getElementById('confirm-box');
const csrf = document.getElementsByName('csrfmiddlewaretoken');

const handleStarSelect = (size) =>{
    const children = form.children;
    for(let i=0; i < children.length; i++){
        if(i <= size){
            children[i].classList.add('checked');
        }else{
            children[i].classList.remove('checked');
        }
    }
}


const handleSelect = (selection) => {
    switch(selection){
        case 'first':{
            // one.classList.add("checked")
            // two.classList.remove("checked")
            // three.classList.remove("checked")
            // four.classList.remove("checked")
            // five.classList.remove("checked")
            handleStarSelect(1);
            return
        }
        case 'second':{
            // one.classList.add("checked")
            // two.classList.add("checked")
            // three.classList.remove("checked")
            // four.classList.remove("checked")
            // five.classList.remove("checked")
            handleStarSelect(2);
            return
        }
        case 'third':{
            // one.classList.add("checked")
            // two.classList.add("checked")
            // three.classList.add("checked")
            // four.classList.remove("checked")
            // five.classList.remove("checked")
            handleStarSelect(3);
            return
        }
        case 'fourth':{
            // one.classList.add("checked")
            // two.classList.add("checked")
            // three.classList.add("checked")
            // four.classList.add("checked")
            // five.classList.remove("checked")
            handleStarSelect(4);
            return
        }
        case 'fifth':{
            // one.classList.add("checked")
            // two.classList.add("checked")
            // three.classList.add("checked")
            // four.classList.add("checked")
            // five.classList.add("checked")
            handleStarSelect(5);
            return
        }
    }
}

const getNumericValue = (stringValue) => {
    let numericValue;
    if(stringValue === 'first'){
        numericValue = 1;
    }else if(stringValue === 'second'){
        numericValue = 2;
    }else if(stringValue === 'third'){
        numericValue = 3;
    }else if(stringValue === 'fourth'){
        numericValue = 4;
    }else if(stringValue === 'fifth'){
        numericValue = 5;
    }else{
        numericValue = 0;
    }

    return numericValue;
}

const arr = [one, two, three, four, five];
if(one){
    arr.forEach(item => item.addEventListener('mouseover', (event) =>{
        handleSelect(event.target.id);
        // console.log(event.target.id);
    }));

    arr.forEach(item => item.addEventListener('click', event=>{
        const val = event.target.id;

        let isSubmit = false;
        form.addEventListener('submit', e =>{
            e.preventDefault();

            if(isSubmit){
                return
            }
            isSubmit = true;
            
            const id = e.target.id;
            const val_num = getNumericValue(val);

            $.ajax({
                type: "POST",
                url: "/rate/",
                data: {
                    'csrfmiddlewaretoken':csrf[0].value,
                    'el_id': id,
                    'val': val_num,
                },
                success: function(response){
                    confirmBox.innerHTML = `<h1>Successfully rated with ${response.score}</h1>`
                },
                error: function(error){
                    confirmBox.innerHTML = `<h1> ooops! something went wrong...</h1>`
                }
            })

        });
    }));
}