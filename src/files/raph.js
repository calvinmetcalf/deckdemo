window.onload = function () {
                var W = 640,
                    H = 480,
                    r = Raphael("holder", W, H),
                    values = [],
                    len = 7;
                for (var i = len; i--;) {
                    values.push(50);
                }
                
                function translate(x, y) {
                    return [
                        50 + (W - 60) / (values.length - 1) * x,
                        H - 10 - (H - 20) / 100 * y
                    ];
                }
                
                function drawPath() {
                    var p = [];
                    for (var j = 1, jj = X.length; j < jj; j++) {
                        p.push(X[j], Y[j]);
                    }
                    p = ["M", X[0], Y[0], "R"].concat(p);
                    var subaddon = "L" + (W - 10) + "," + (H - 10) + ",50," + (H - 10) + "z";
                    path.attr({path: p});
                    sub.attr({path: p + subaddon});
                }
                
                var p = [["M"].concat(translate(0, values[0]))],
                    color = "hsb(240°, 1, 1)",
                    X = [],
                    Y = [],
                    blankets = r.set(),
                    buttons = r.set(),
                    w = (W - 60) / values.length,
                    isDrag = -1,
                    start = null,
                    sub = r.path().attr({stroke: "none", fill: [90, color, color].join("-"), opacity: 0}),
                    path = r.path().attr({stroke: color, "stroke-width": 2}),
                    unhighlight = function () {};
                var ii;
                for (i = 0, ii = values.length - 1; i < ii; i++) {
                    var xy = translate(i, values[i]),
                        xy1 = translate(i + 1, values[i + 1]),
                        f;
                    X[i] = xy[0];
                    Y[i] = xy[1];
                    (f = function (i, xy) {
                        buttons.push(r.circle(xy[0], xy[1], 5).attr({fill: color, stroke: "none"}));
                        blankets.push(r.circle(xy[0], xy[1], w / 2).attr({stroke: "none", fill: "#fff", opacity: 0}).mouseover(function () {
                            if (isDrag + 1) {
                                unhighlight = function () {};
                            } else {
                                buttons.items[i].animate({r: 10}, 200);
                            }
                        }).mouseout(function () {
                            if (isDrag + 1) {
                                unhighlight = function () {
                                    buttons.items[i].animate({r: 5}, 200);
                                };
                            } else {
                                buttons.items[i].animate({r: 5}, 200);
                            }
                        }).drag(function (dx, dy) {
                            var start = this.start;
                            start && update(start.i, start.p + dy);
                        }, function (x, y) {
                            this.start = {i: i, m: y, p: Y[i]};
                        }));
                        blankets.items[blankets.items.length - 1].node.style.cursor = "move";
                    })(i, xy);
                    if (i == ii - 1) {
                        f(i + 1, xy1);
                    }
                }
                xy = translate(ii, values[ii]);
                X.push(xy[0]);
                Y.push(xy[1]);
                
                drawPath();
                var update = function (i, d) {
                    (d > H - 10) && (d = H - 10);
                    (d < 10) && (d = 10);
                    Y[i] = d;
                    drawPath();
                    buttons.items[i].attr({cy: d});
                    blankets.items[i].attr({cy: d});
                    r.safari();
                };
            };
