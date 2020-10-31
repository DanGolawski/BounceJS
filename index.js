window.onload = () => {
    const canvas = document.querySelector('#gameField');
    const context = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;


    const game = new Game(context);
    game.start(map);

    requestAnimationFrame(render);

    function render() {
        game.draw();
        game.manage();
        requestAnimationFrame(render);
    }

}