


window.addEventListener('load', function() {
    const tabList = document.querySelector('.tab-list');
    const tabItems = document.querySelectorAll('.tab-item');
    const btnPrev = document.querySelector('.tab-prev');
    const btnNext = document.querySelector('.tab-next');
    let deltaScroll = 40;
    const tabScrollWidth = tabList.scrollWidth - tabList.clientWidth;
    const firstTabItem = tabItems[0];
    const lastTabItem = tabItems[tabItems.length - 1];

    [...tabItems].forEach(item => item.addEventListener('click', handleTabItemClick));

    function handleTabItemClick(e) {
        e.preventDefault();
        
        const target = e.target;

        [...tabItems].forEach(item => item.classList.remove('active'));
        target.classList.add('active');

        if (target === firstTabItem) {
            btnPrev.classList.add('disabled');
        } else if (target === lastTabItem) {
            btnNext.classList.add('disabled');
        } else {
            btnPrev.classList.remove('disabled');
            btnNext.classList.remove('disabled');
        }

        e.target?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    }

    tabList.addEventListener('wheel', function(e) {
        e.preventDefault();

        const delta = -e.deltaY;

        // fix first scroll can not active
        const nexScrollLeft = Math.ceil(this.scrollLeft + delta);

        if (nexScrollLeft > 0){
            btnPrev.classList.remove('disabled');

            if (nexScrollLeft >= tabScrollWidth) {
                btnNext.classList.add('disabled');
            }
        }

        if (nexScrollLeft < tabScrollWidth) {
            btnNext.classList.remove('disabled');

            if (nexScrollLeft <= 0) {
                btnPrev.classList.add('disabled');
            } 
        }

        this.scrollLeft = nexScrollLeft;
    });

    btnNext.addEventListener('click', function(e) {
        e.preventDefault();

        tabList.scrollLeft += deltaScroll;

        if (btnPrev.classList.contains('disabled') && tabList.scrollLeft >= 0) {
            btnPrev.classList.remove('disabled');
        }

        if (tabList.scrollLeft >= tabScrollWidth) {
            this.classList.add('disabled');
        } 

    }); 

    btnPrev.addEventListener('click', function(e) {
        e.preventDefault();

        tabList.scrollLeft -= deltaScroll;

        if (btnNext.classList.contains('disabled') && tabList.scrollLeft <= tabScrollWidth) {
            btnNext.classList.remove('disabled');
        }

        if (tabList.scrollLeft <= 0) {
            this.classList.add('disabled');
        } 
    }); 
    
})




