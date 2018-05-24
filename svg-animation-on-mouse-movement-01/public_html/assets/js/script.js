/*
 * @author Zunayed Hassan
 */

"use strict";

(function main() {
    
    let windowWidth           = window.innerWidth;
    let windowHeight          = window.innerHeight;
    let body                  = document.querySelector("body");
    
    body.style.width          = windowWidth;
    body.style.height         = windowHeight;
    
    // Add main background
    let image                 = "assets/images/bg.jpg";
    let revealCircleRadius    = 25;
    let blur                  = 10;
    let imageWidth            = 1920;
    let imageHeight           = 1080;
    let backgroundTemplate    = '<svg id="bg-svg" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" height="' + windowHeight + '" width="' + windowWidth + '"> <defs>  <pattern id="pattern826" patternTransform="matrix(1,0,0,1,0,58.875)" height="' + windowHeight + '" width="' + ((imageWidth / imageHeight) * windowHeight) + '" patternUnits="userSpaceOnUse"> <image y="0" x="0" id="image823" xlink:href="' + image + '" preserveAspectRatio="none" height="' + windowHeight + '" width="' + ((imageWidth / imageHeight) * windowHeight) + '" /> </pattern> <filter height="1.0333333" y="-0.016666667" width="1.01875" x="-0.0093749999" id="filter1551" style="color-interpolation-filters:sRGB"> <feGaussianBlur id="feGaussianBlur1553" stdDeviation="' + blur + '" /> </filter> </defs> <g id="bg-svg-group"> <rect y="0" x="0" height="' + windowHeight + '" width="' + windowWidth + '" id="rect1547" style="fill:url(#pattern826);fill-opacity:1;stroke:none;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;filter:url(#filter1551)" /> <rect y="0" x="0" height="' + windowHeight + '" width="' + windowWidth + '" id="rect1549" style="fill:#000000;fill-opacity:0.38333333;stroke:none;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" /> </g> </svg>';
    let loginBackground       = document.querySelector("#login-background");
    
    loginBackground.innerHTML = backgroundTemplate;
    
    // Move the reveal-circle with mouse move
    let currentTime           = Date.now();
    let timeDifference        = 0;
    let previousMouseX        = null;
    let previousMouseY        = null;
    let currentMouseX         = null;
    let currentMouseY         = null;
    let bgSvgGroup            = document.querySelector("#bg-svg-group");
    let revealCircleUpSpeed   = 1;
    let revealCircleDownSpeed = 0.5;
    let maxRevealCircleRadius = 70;
    
    body.addEventListener("mousemove", event => {
        currentMouseX = event.clientX;
        currentMouseY = event.clientY;
        
        bgSvgGroup.innerHTML += '<circle data-time=' + Date.now() + ' r="' + revealCircleRadius + '" cy="' + currentMouseY + '" cx="' + currentMouseX + '" class="reveal-circle" style="fill:url(#pattern826);fill-opacity:1.0;stroke:none;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" />';
        
        if (previousMouseX === null) {
            previousMouseX = currentMouseX;
        }
        
        if (previousMouseY === null) {
            previousMouseY = currentMouseY;
        }
    });
    
    setInterval(() => {
        currentTime = Date.now();
        
        let revealCircles = document.querySelectorAll(".reveal-circle");
        
        if (revealCircles !== undefined) {
            revealCircles.forEach((revealCircle, i) => {
                let radius = parseFloat(revealCircle.getAttribute("r"));
                timeDifference = currentTime - parseInt(revealCircle.getAttribute("data-time"));
        
                if (timeDifference > 300) {
                    radius -= revealCircleDownSpeed;

                    if (radius < 0) {
                        radius = 0;
                    }
                }
                else if (timeDifference < 300) {
                    radius += revealCircleUpSpeed;

                    if (radius > maxRevealCircleRadius) {
                        radius = maxRevealCircleRadius;
                    }
                }
                else {
                    radius = 0;
                }

                revealCircle.setAttribute("r", radius);
                
                if (radius <= 3) {
                    bgSvgGroup.removeChild(revealCircle);
                }
            });
        }
        
    }, 10);
    
}) ();