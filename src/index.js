// var scrolling = false;
// $(document).ready(function() {
//     $('#leaderboard').hammer({
//         threshold: 100
//     }).bind("pan", leaderPan);
//     //IE, Opera, Safari
//     $('#leaderboard').bind('mousewheel', function(e) {
//         if (e.originalEvent.wheelDelta < 0) {
//             //scroll down
//             if (!scrolling) {
//                 leaderPan(true);
//             }
//         } else {
//             //scroll up
//             if (scrolling) {
//                 leaderPan(false);
//             }
//         }
//     });
// });

// function leaderPan(b) {
//     if (b) {
//         scrolling = !scrolling;
//         $('#activeUser').animate({
//             marginTop: '-30vh',
//             opacity: 0
//         });
//         $('#leaderboard').animate({
//             height: '75vh'
//         });
//     } else {
//         scrolling = !scrolling;
//         $('#activeUser').animate({
//             marginTop: '0vh',
//             opacity: 1
//         });
//         $('#leaderboard').animate({
//             height: '45vh'
//         });
//     }
// }
