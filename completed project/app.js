// ============ VARIABLES ============
const imageList = document.querySelector('.image__list');
const bullets = document.querySelector('.bullets');
const bulletList = document.querySelectorAll('.bullet');
const bulletArr = Array.from(bulletList);

let currentIndex = 0;
bulletList[currentIndex].classList.add('selected');


// ============ CHANGE IMAGE ============
const changeImage = (index) => {
    removeImage(index);
    // Because the imageList will change later so we have to use getElementsByTagName, querySelectorAll just for static elements
    const imageItems = document.getElementsByClassName(`image__item${index}`);
    // Add the first image element, because it will be have the default setting css
    imageList.insertAdjacentHTML('beforeend', `<div class="image__item${index}"></div>`)
    const w = imageItems[0].offsetWidth; // get the first width of element
    // Now add the 4 pieces
    for (let i = 1; i < 5; i++) {// 5 = 5 pieces
        imageList.insertAdjacentHTML('beforeend', `<div class="image__item${index}"></div>`)

        imageItems[i].style.left = `${w * i}px`;
        imageItems[i].style.backgroundPosition = `-${w * i}px 0`;
        imageItems[i].style.animationDelay = `${0.1 * i}s`;
    }

    // Set new image to the top of imageList
    Array.from(imageItems).forEach(item => item.style.zIndex = '2');
}
changeImage(currentIndex)


// ============ REMOVE OLD IMAGE ============
function removeImage(index) {
    const imageItems = document.getElementsByClassName(`image__item${index}`);
    Array.from(imageItems).forEach(item => item.remove());
}

// ============ SEND IMAGE TO THE BACK ============
function hiddenImage(index) {
    const imageItems = document.getElementsByClassName(`image__item${index}`);
    Array.from(imageItems).forEach(item => item.style.zIndex = '1');
}

const startLooping = () => {
    var timer;
    // Run looping when the window start
    window.onload = resetLoop();
    // Change image when clicked to the bullet
    bulletList.forEach((bullet)=>{
        bullet.addEventListener('click', ()=>{
            resetLoop();

            if(bulletList[currentIndex] !== bullet){
                bulletList[currentIndex].classList.remove('selected')
                bullet.classList.add('selected');
                hiddenImage(currentIndex);

                // This bullet is the next index
                const nextIndex = bulletArr.indexOf(bullet);
                currentIndex = nextIndex;
                changeImage(currentIndex)
            }
        })
    })


    // ============ LOOPING IMAGE ============
    function looping() {
        bulletList[currentIndex].classList.remove('selected');
        hiddenImage(currentIndex);
        currentIndex++;
        if(currentIndex >= bulletList.length) currentIndex = 0;
        changeImage(currentIndex)
        bulletList[currentIndex].classList.add('selected');
    }

    // Change current index to the next image

    // ============ RESET FUNCTION ============
    function resetLoop() {
        clearInterval(timer);
        timer = setInterval(looping, 2000);
    }
}

startLooping()
