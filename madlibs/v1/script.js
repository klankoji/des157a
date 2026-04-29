(function () {
    'use strict';
    console.log('reading js');

    const myForm = document.querySelector('#myForm');
    const overlay = document.querySelector('.overlay');
    const resetBtn = document.querySelector('#resetBtn');

    myForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const adj = document.querySelector('#adj').value;
        const noun = document.querySelector('#noun').value;
        const verb = document.querySelector('#verb').value;
        const place = document.querySelector('#place').value;
        const animal = document.querySelector('#animal').value;

        document.querySelector('#out-adj').innerHTML = adj;
        document.querySelector('#out-noun').innerHTML = noun;
        document.querySelector('#out-verb').innerHTML = verb;
        document.querySelector('#out-place').innerHTML = place;
        document.querySelector('#out-animal').innerHTML = animal;

        overlay.classList.remove('off');
        overlay.classList.add('on');
    });

    resetBtn.addEventListener('click', function () {
        overlay.classList.remove('on');
        overlay.classList.add('off');
        myForm.reset();
    });

})();