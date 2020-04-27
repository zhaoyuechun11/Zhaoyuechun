
function distance2D(x1,y1,x2,y2){ //거리구하기
  if(!x2) x2=0; 
  if(!y2) y2=0;
  return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)); 
}
//Math.dist(0,0, 3,4); //the output will be 5
//Math.dist(1,1, 4,5); //the output will be 5
//Math.dist(3,4); //the output will be 5

function randRangeFromInt(low, high) // Get a random int between low and high, inclusive
{
    return (low + Math.random()*(high-low+1))|0;
}


//--------------------------공A중심xy, 공A반지름, 공B중심xy, 공B반지름
function circleIntersectionFromPos(x1, y1, r1, x2, y2, r2) {
    // Calculate the distance between the centers
    var dx = x1 - x2;
    var dy = y1 - y2;
    var len = Math.sqrt(dx * dx + dy * dy);

    if (len < r1 + r2) {
        // Circles intersect
        return true;
    }

    return false;
}

function radToDegFromAngle(angle) // Convert radians to degrees //포지션에서 각도를 계산할 때
{
    return angle * (180 / Math.PI);
}


function degToRadFromPI(angle) // Convert degrees to radians //각도에서 포지션을 계산할 때
{ 
    return angle * (Math.PI / 180);
}

function moveToAngle( angle, dist ) //각도로 거리만큼 이동(로컬좌표리턴)
{
    var ret = {x:0, y:0};
    ret.x = dist * Math.cos(degToRadFromPI(angle));
    ret.y = dist * -1*Math.sin(degToRadFromPI(angle));
    return ret;
}

function rotateFromPos(cx, cy, x, y, angle) //지정위치에서 회전함수
{
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}

function getAngleFromPos( centerX, centerY, X, Y)
{
//   html screen
//   (0,0)+---+
//        |   |
//        +---+(625,625)
    var mouseangle = radToDeg(Math.atan2(centerY-Y, X-centerX));
//              (90)
//          179  |   1 
//      (-180)--중심--(0)
//          -179 |  359
//             (-90)
     while(mouseangle < 0)   { mouseangle = mouseangle+360; }           
     while(mouseangle > 360) { mouseangle = mouseangle-360; }           
//               (90)
//                 |    
//         (180)--중심--(0) Math.floor(mouseangle)시
//                 |
//               (270)
        
    return mouseangle;
}
function cropAngleWith180(angle, min, max)
{
//               (90)
//                 |    
//         (180)--중심--(0) 좌표계
//                 |
//               (270)    
    if (angle > 90 && angle < 270) // Left
    {
        if (angle > max)
        {
            angle = max;
        }
    }
    else // Right
    {
        if (angle < min || angle >= 270)
        {
            angle = min;
        }
    }
    return angle;
}