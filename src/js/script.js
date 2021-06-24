class ViewObject{
    constructor(wrapperSelector, {pathImg, img, imgFormat, maxImg, autoRotateSpeed = 0, rotateSpeed = 2}){
        this.pathImg = pathImg;
        this.img = img;
        this.imgFormat = imgFormat;
        this.maxImg = maxImg;
        this.wrapperSelector = wrapperSelector;
        this.autoRotateSpeed = autoRotateSpeed;
        this.rotateSpeed = rotateSpeed;
        this.init();
        this.imagePreload();
    }
    
    imagePreload(){
        
        for(let i = 1; i <= this.maxImg; i++){
            let image = new Image();
            image.src = window.location.href+this.pathImg+"/"+this.img+i+"."+this.imgFormat;
        }
    }

    init(){
        let clickX = null,
            currentIndex = 1,
            speed = 2,
            lastPositionBool = true,
            min = null,
            max = null,
            autoRotation = false,
            rotationInterval = null,
            TimerRotation = null;
            
        this.element = document.querySelector(this.wrapperSelector+" img")

        this.element.addEventListener('mousedown', (e) => {
            clickX = e.clientX;
            clearInterval(rotationInterval);
            clearTimeout(TimerRotation);
            
        });
        document.addEventListener('mouseup', () => {
            if(clickX){
                autoRotate();
            }

            clickX = null;
            min = null;
            max = null;
        });
        document.addEventListener('mousemove', (e) => {
            if(clickX !== null){
                let mousePosition = clickX - e.clientX;
                if(lastPositionBool){
                    min = mousePosition - speed;
                    max = mousePosition + speed;
                    lastPositionBool = false;
                }

                if(mousePosition > max){
                    currentIndex++;
                    viewInit(currentIndex, this.pathImg, this.img, this.imgFormat);
                    lastPositionBool = true;
                }
                if(mousePosition < min){
                    currentIndex--;
                    viewInit(currentIndex, this.pathImg, this.img, this.imgFormat);
                    lastPositionBool = true;
                }
            }
                    
        });

        const viewInit = (direction, pathImg, img, imgFormat) => {
            
            if(direction > this.maxImg){
                currentIndex = 1;
                
            }
            if(direction <= 0){
                currentIndex = this.maxImg;
            }
            this.element.setAttribute('src', pathImg+"/"+img+currentIndex+"."+imgFormat)
        };

        const autoRotate = () => {
            if(this.rotateSpeed !== 0){
                TimerRotation = setTimeout(() => {
                    autoRotation = true;
                    if(autoRotation){
                        rotationInterval = setInterval(() => {
                            currentIndex++;
                            viewInit(currentIndex, this.pathImg, this.img, this.imgFormat);
                        }, this.autoRotateSpeed);
                    }
                }, 1000);
            }
        };
        autoRotate();
    }
}
new ViewObject('#view-360-wrapper', {
    pathImg: 'src/img/mercedes',
    img: 'angle',
    imgFormat: 'png',
    maxImg: 36,
    autoRotateSpeed: 50,
    rotateSpeed: 3
});
