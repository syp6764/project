/* 서브 */
// 모바일 서브 드롭 타이틀 - 20240830 추가
/*document.addEventListener('DOMContentLoaded', () => {
    const activeLeftItem = document.querySelector('.sub-menu-list > li.active');
    const activeSubTitle = document.querySelector('.sub-head .sub-title').innerText;
    if (activeLeftItem) {
        const subUl = activeLeftItem.querySelector('.sub-ul');
        if (subUl) {
            const header = document.querySelector('.sub-head');
            if (header) {
                const updatedSubUlHtml = subUl.innerHTML.replace(/class="subm"/g, 'class="item-link"');
                const newDropHtml = `
                    <div class="krds-drop-wrap sub-title-drop">
                        <button type="button" class="sub-title drop-btn">${activeSubTitle}</button>
                        <div class="drop-menu">
                            <div class="drop-in">
                                <ul class="drop-list">
                                    ${updatedSubUlHtml}
                                </ul>
                            </div>
                        </div>
                    </div>
                `;

                header.insertAdjacentHTML('beforeend', newDropHtml);
            }
        }
    }
});*/

//url 복사 - 20240902 추가
const copyButtons = document.querySelectorAll(".url-copy");
copyButtons.forEach(button => {
    button.addEventListener("click", function() {
        const url = window.location.href;
        const tempInput = document.createElement("textarea");
        tempInput.value = url;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);

        alert("URL이 복사되었습니다!");
    });
});