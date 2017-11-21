   
    var map = document.getElementById('snake_map');

        var colNumber = 20;
        var rowNumber = 25;
        var mapWidth = colNumber * 20 + 'px';
        var mapHeight = rowNumber * 20 + 'px';
        map.style.width = mapWidth;
        map.style.height = mapHeight;
        var snakeDIVposition = [];
        for (var i = 0; i < rowNumber; i++) {
            var rowDiv = document.createElement('div');
            rowDiv.className = 'row';
            map.appendChild(rowDiv);
            var rowArray = [];
            for (var j = 0; j < colNumber; j++) {
                var colDiv = document.createElement('div');
                colDiv.className = 'col';
                rowDiv.appendChild(colDiv);
                rowArray.push(colDiv);
            }
            snakeDIVposition.push(rowArray);
        }

        //创建蛇模型
        var snake = [];
        for (var i = 0; i < 3; i++) {
            //为蛇身设置不同颜色的div
            snakeDIVposition[0][i].className = 'col activeSnake';
            //存储在蛇身数组中
            snake[i] = snakeDIVposition[0][i];
        }
        var x = 2;
        var y = 0;
        var scoreCount = 0;
        var eggX = 0;
        var eggY = 0;
        var direction = 'right';
        var changeDir = true;
        var delayTimer = null;
        document.onkeydown = function(event) {
            if (!changeDir) {
                return;
            }
            event = event || window.event;
            //判断蛇尾还是蛇头
            if (direction == 'right' && event.keyCode == 37) {
                return;
            }
            if (direction == 'left' && event.keyCode == 39) {
                return;
            }
            if (direction == 'down' && event.keyCode == 38) {
                return;
            }
            if (direction == 'up' && event.keyCode == 40) {
                return;
            }
            //            通过keyCode确定蛇移动的方向
            switch (event.keyCode) {
                case 37:
                    direction = 'left'; //向左
                    break;
                case 38:
                    direction = 'up'; //向上;
                    break;
                case 39:
                    direction = 'right'; //向右
                    break;
                case 40:
                    direction = 'down'; //向下
                    break;
            }
            changeDir = false;
            delayTimer = setTimeout(function() {
                changeDir = true;
            }, 300);
        }

        function snakeMove() {
            //根据上面设置的方向来设置蛇头的位置
            switch (direction) {
                case 'left':
                    x--;
                    break;
                case 'right':
                    x++;
                    break;
                case 'up':
                    y--;
                    break;
                case 'down':
                    y++;
                    break;
            }
            //判断是否游戏结束
            if (x < 0 || y < 0 || x >= colNumber || y >= rowNumber) {
                alert('Game Over!!!');
                // 结束蛇移动的定时器
                clearInterval(moveTimer);
                return; //终止键盘事件;
            }
            //如果蛇吃到自己,也要结束游戏
            for (var i = 0; i < snake.length; i++) {
                //将此时蛇头移动后的位置与之前左右的组成蛇的div的位置进行比较,如果相同则说明吃到自己,游戏结束
                if (snake[i] == snakeDIVposition[y][x]) {
                    alert('Game over!!!');
                    clearInterval(moveTimer);
                    return;
                }
            }
              
            //判断蛇头移动的位置是否有蛋
            if (eggX == x && eggY == y) {
                snakeDIVposition[eggY][eggX].className = 'col activeSnake';
                
                snake.push(snakeDIVposition[eggY][eggX]); //加入蛇身
                scoreCount++; //记录分数
                //更新当前的分数
                score.innerHTML = scoreCount;
                //随机产生一个新的蛋
                createNewEgg();
            } else {
                //设置蛇碰不到蛋的逻辑
                //让蛇移动
                //蛇尾去掉蛇自身的颜色,变成格子的颜色
                snake[0].className = 'col';
                //将蛇尾div从数组中移除
                snake.shift();
                //定位到的新的蛇头加入到蛇数组中
                snakeDIVposition[y][x].className = 'col activeSnake';
                snake.push(snakeDIVposition[y][x]);
            }
        }
        var moveTimer = setInterval('snakeMove()', 300);

        function random(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        function createNewEgg() {
            // 随机出新的egg的下标的x和y值
            eggX = random(0, colNumber - 1);
            eggY = random(0, rowNumber - 1);

            //判断如果随机产生的蛋与蛇身重合,就重新随机产生一个蛋
            if (snakeDIVposition[eggY][eggX].className == 'col activeSnake') {
                createNewEgg(); //重新随机新的egg
            } else {
                snakeDIVposition[eggY][eggX].className = 'col egg';
            }
        }
        //在游戏开始的时候随机产生蛋
        createNewEgg();
        var pause = document.getElementById('Pause');
        var start = document.getElementById('Start');
        var refresh = document.getElementById('Refresh');
        var speed = document.getElementById('Speed');
        //添加暂停按钮
        pause.onclick = function() {
            clearInterval(moveTimer);
        }
        //添加开始按钮
        start.onclick = function() {
            clearInterval(moveTimer);
            moveTimer = setInterval('snakeMove()', speed1);
        }
        //添加刷新按钮
        refresh.onclick = function() {
            window.location.reload();
        }
        //添加加速按钮
        var speed1 = 300;
        speed.onclick = function() {
            speed1 += 40;
            clearInterval(moveTimer);
            moveTimer = setInterval('snakeMove()', speed1);
        }

