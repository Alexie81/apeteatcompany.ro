"use strict";
(self.webpackChunk_roots_bud_sage_sage = self.webpackChunk_roots_bud_sage_sage || []).push([[131], {
    "./styles/homepage.css": () => {}
    ,
    "./styles/modal-order.css": () => {}
    ,
    "./scripts/modal-order.js": (e, t, a) => {
        var n = a("../node_modules/flowbite/lib/esm/index.js")
          , s = a("../node_modules/swiper/swiper-bundle.mjs")
          , r = a("../node_modules/air-datepicker/index.es.js");
        let i = 1
          , d = 0
          , c = "clasic"
          , o = {};
        const l = "#datepicker";
        let u, y;
        function m(e) {
            const t = document.getElementById("alertModal")
              , a = new n.u_(t);
            jQuery("#alertModal h3").html(e),
            a.show(),
            document.querySelectorAll('[data-modal-hide="alertModal"]').forEach((function(e) {
                e.addEventListener("click", (function() {
                    a.hide()
                }
                ))
            }
            ))
        }
        function h(e) {
            jQuery(l).html() && jQuery(l).empty();
            const t = {
                locale: {
                    days: ["Duminic\u0103", "Luni", "Mar\u0163i", "Miercuri", "Joi", "Vineri", "S\xe2mb\u0103t\u0103"],
                    daysShort: ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "S\xe2m"],
                    daysMin: ["D", "L", "Ma", "Mi", "J", "V", "S"],
                    months: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
                    monthsShort: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                    today: "Azi",
                    clear: "\u015eterge",
                    dateFormat: "dd.MM.yyyy",
                    timeFormat: "HH:mm",
                    firstDay: 1
                },
                minDate: p(),
                maxDate: f(),
                onRenderCell(e) {
                    let {date: t, cellType: a} = e;
                    if ("day" === a) {
                        const e = 0 === t.getDay() || 6 === t.getDay()
                          , a = function(e) {
                            const t = e.getFullYear() + "-" + ("0" + (e.getMonth() + 1)).slice(-2) + "-" + ("0" + e.getDate()).slice(-2);
                            return themeVars.blockedDates.includes(t)
                        }(t);
                        if (e || a)
                            return {
                                disabled: !0,
                                classes: "disabled-class"
                            }
                    }
                },
                multipleDates: e
            };
            u = new r.Z(l,t)
        }
        function p() {
            let e = new Date
              , t = 6e4 * e.getTimezoneOffset()
              , a = new Date(e.getTime() + t + 108e5);
            a.getHours() > 12 || 12 === a.getHours() ? a.setDate(a.getDate() + 2) : a.setDate(a.getDate() + 1),
            a.setHours(0, 0, 0, 0);
            let n = a.getFullYear()
              , s = a.getMonth() + 1
              , r = a.getDate();
            return s = s < 10 ? "0" + s : s,
            r = r < 10 ? "0" + r : r,
            `${n}-${s}-${r}`
        }
        function f() {
            let e = new Date
              , t = (8 - e.getDay()) % 7;
            0 === e.getDay() && (e.getHours() < 12 || 12 === e.getHours()) ? t = 1 : 0 !== e.getDay() && 0 !== t || (t += 7),
            e.setDate(e.getDate() + t + 20);
            let a = e.getFullYear()
              , n = e.getMonth() + 1
              , s = e.getDate();
            return n = n < 10 ? "0" + n : n,
            s = s < 10 ? "0" + s : s,
            `${a}-${n}-${s}`
        }
        function v() {
            !function() {
                const e = 1 === d ? "zi" : "zile";
                jQuery("#daysHeader").html(`Meniu ${d} ${e}`)
            }(),
            function() {
                $("#daysTop").empty();
                let e = 1;
                Object.keys(y[c]).sort(( (e, t) => new Date(e) - new Date(t))).forEach((function(t, a) {
                    const n = function(e) {
                        const t = e.substring(0, 4)
                          , a = e.substring(4, 6)
                          , n = e.substring(6, 8)
                          , s = new Date(`${t}-${a}-${n}`)
                          , r = s.getDate()
                          , i = ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"][s.getMonth()];
                        return `${r < 10 ? "0" : ""}${r} ${i}`
                    }(t)
                      , s = e < i
                      , r = $(`<div class="day-tab ${e === i ? "highlighted" : ""}"></div>`);
                    r.css("color", s ? "#D6C053" : "#AFAFAF"),
                    r.append($(`<div class="date">${n}</div>`)),
                    daysTop.append(r[0]),
                    $.get(themeVars.images["day" + e + "-icon.svg"], (function(e) {
                        const t = $(e).find("svg");
                        t.find("path").css("fill", s ? "#D6C053" : "#AFAFAF"),
                        r.prepend(t)
                    }
                    )),
                    e++
                }
                ))
            }();
            const e = function(e) {
                return Object.entries(e).filter((e => {
                    let[t] = e;
                    return "Extra" !== t
                }
                )).map((e => {
                    let[t,a] = e;
                    return function(e, t) {
                        const a = t.map(( (e, t) => {
                            const a = (n = e.nutritionalInfo,
                            Object.entries(n).filter((e => {
                                let[t] = e;
                                return "allergens" !== t
                            }
                            )).map((e => {
                                let[t,a] = e;
                                return `\n            <div>${t}:<span class="nutritional-values">${a}</span></div>\n        `
                            }
                            )).join(""));
                            var n;
                            return `<div class="dish-card" data-day="${e.meta.selectedDay}" data-menuID="${e.meta.menuID}" data-productID="${e.meta.menuProductID}" data-index="${t}">\n                    <div class="informations">\n                        <img src="${themeVars.images["info-icon.svg"]}" width="32" height="32">\n                        Informatii Nutritionale\n                        <div class="nutritional-card">\n                            <div class="nutritional-info">\n                                ${a}\n                            </div>\n                        <div class="alergeni">\n                            <h2>Alergeni:</h2>\n                            <p>${e.nutritionalInfo.allergens}</p>\n                        </div>\n                    </div>\n            </div>\n            <div class="dish-card-main-content">\n                <img src="${e.image.small}" alt="${e.name}">\n                <div class="dish-card-secondary-content">\n                    <div class="name-and-grams">\n                        <h4>${e.name}</h4>\n                        <p class="grams">${e.grams}</p>\n\n                    </div>\n                    <div class="ingredients-tooltip">\n                        <p class="ingredients" data-tooltip="${e.ingredients}">\n                            Vezi ingredientele...\n                        </p>\n                    </div>\n                </div>\n            </div>\n            <div class="selected-circle">\n                <div class="inner-circle"></div>\n            </div>\n        </div>`
                        }
                        )).join("");
                        return `<div class="meal"><h3>${e}</h3><div class="dish-card-wrapper">${a}</div></div>`
                    }(t, a)
                }
                )).join("") + function(e) {
                    const t = e.map(( (e, t) => `<div class="swiper-slide extra-card" data-day="${e.meta.selectedDay}" data-menuID="${e.meta.menuID}" data-productID="${e.meta.menuProductID}" data-index="${t}">\n                    <div class="dish-card-main-content">\n                        <img src="${e.image.small}" alt="${e.name}">\n                        <div class="dish-card-secondary-content">\n                            <div class="name-and-grams">\n                                <h4>${e.name}</h4>\n                            </div>\n                            <div class="price-qty grid grid-cols-2">\n                                <p class="font-bold">${e.extraPrice} <span class="currency">${themeVars.currencySymbol}</span></p>\n                                <div class="input-quantity hidden grid-cols-3 place-items-center">\n                                    <div class="minus">\n                                        <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">\n                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>\n                                        </svg>\n                                    </div>\n                                    <p class="text-xs font-bold qty-value" data-extra-qty="1">1</p>\n                                    <div class="plus">\n                                        <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">\n                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>\n                                        </svg>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="selected-circle">\n                        <div class="inner-circle"></div>\n                    </div>\n                </div>`)).join("");
                    return `<div class="extra-container"><h3>Extra</h3><div class="swiper-container"><div class="swiper-wrapper">${t}</div><div class="swiper-pagination"></div><div class="swiper-button-next"></div><div class="swiper-button-prev"></div></div></div>`
                }(e.Extra)
            }(function() {
                const e = Object.keys(y[c]).sort()[i - 1];
                return y[c][e]
            }());
            jQuery("#mealContainer").html(e),
            function() {
                i > 1 ? jQuery("#backDay").show().css("display", "flex") : jQuery("#backDay").hide();
                i < d ? jQuery("#nextDay").show().css("display", "flex") : jQuery("#nextDay").hide();
                i === d ? jQuery("#nextStep").show().css("display", "flex") : jQuery("#nextStep").hide()
            }(),
            jQuery(".dish-card").click((function() {
                jQuery(this).siblings().removeClass("selected"),
                jQuery(this).siblings().find(".inner-circle").css("background-color", ""),
                jQuery(this).addClass("selected"),
                jQuery(this).find(".inner-circle").css("background-color", "#E1BD06");
                let e = {
                    day: jQuery(this).data("day"),
                    menuID: jQuery(this).data("menuid"),
                    menuProductID: jQuery(this).data("productid")
                };
                const t = jQuery(this).closest(".meal").find("h3").text()
                  , a = jQuery(this).find("h4").text();
                o[i] || (o[i] = {}),
                o[i].meta || (o[i].meta = {}),
                o[i].meta[t] || (o[i].meta[t] = []),
                o[i].meta[t] = e,
                o[i][t] = a
            }
            )),
            jQuery(".extra-card").click((function() {
                const e = jQuery(this)
                  , t = e.find("h4").text();
                let a = {
                    day: e.data("day"),
                    menuID: e.data("menuid"),
                    menuProductID: e.data("productid"),
                    extraQty: e.find(".qty-value").data("extra-qty")
                };
                if (o[i] = o[i] || {},
                o[i].Extra = o[i].Extra || [],
                o[i].meta = o[i].meta || [],
                o[i].meta.Extra = o[i].meta.Extra || [],
                e.hasClass("selected")) {
                    e.removeClass("selected"),
                    e.find(".inner-circle").css("background-color", "");
                    const n = o[i].Extra.indexOf(t);
                    o[i].meta.Extra.findIndex((e => e.day === a.day && e.menuID === a.menuID && e.menuProductID === a.menuProductID)),
                    n > -1 && (o[i].Extra.splice(n, 1),
                    o[i].meta.Extra.splice(n, 1))
                } else
                    e.addClass("selected"),
                    e.find(".inner-circle").css("background-color", "#E1BD06"),
                    o[i].Extra.push(t),
                    o[i].meta.Extra.push(a);
                const n = e.find(".input-quantity")
                  , s = e.find(".qty-value");
                e.hasClass("selected") ? (n.removeClass("hidden").addClass("grid"),
                s.text("1"),
                s.data("extra-qty", 1)) : n.addClass("hidden").removeClass("grid")
            }
            )),
            jQuery(".extra-card .minus").click((function(e) {
                e.stopPropagation();
                const t = jQuery(this).closest(".extra-card")
                  , a = t.find(".qty-value");
                let n = parseInt(a.data("extra-qty"), 10);
                n > 0 && (n -= 1,
                a.data("extra-qty", n).text(n),
                g(t, n)),
                0 === n && t.click()
            }
            )),
            jQuery(".extra-card .plus").click((function(e) {
                e.stopPropagation();
                const t = jQuery(this).closest(".extra-card")
                  , a = t.find(".qty-value");
                let n = parseInt(a.data("extra-qty"), 10);
                n += 1,
                a.data("extra-qty", n).text(n),
                g(t, n)
            }
            )),
            new s.Z(".swiper-container",{
                slidesPerView: 1,
                spaceBetween: 30,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: !0
                },
                navigation: {
                    nextEl: ".custom-arrow-next",
                    prevEl: ".custom-arrow-prev"
                },
                breakpoints: {
                    1e3: {
                        slidesPerView: 2
                    },
                    1500: {
                        slidesPerView: 3
                    },
                    2080: {
                        slidesPerView: 4
                    }
                }
            }),
            function() {
                const e = o[i];
                if (e) {
                    for (const [t,a] of Object.entries(e))
                        "meta" !== t && "Extra" !== t && jQuery(`.dish-card:contains("${a}")`).addClass("selected").find(".inner-circle").css("background-color", "#E1BD06");
                    e.meta && e.meta.Extra && e.meta.Extra.forEach((e => {
                        const t = jQuery(`.extra-card[data-productid="${e.menuProductID}"]`);
                        t.addClass("selected").find(".inner-circle").css("background-color", "#E1BD06");
                        const a = t.find(".qty-value");
                        a.text(e.extraQty),
                        a.data("extra-qty", e.extraQty);
                        const n = t.find(".input-quantity");
                        e.extraQty > 0 ? n.removeClass("hidden").addClass("grid") : n.addClass("hidden").removeClass("grid")
                    }
                    ))
                }
            }()
        }
        function g(e, t) {
            const a = e.data("day")
              , n = e.data("menuid")
              , s = e.data("productid")
              , r = o[i].meta.Extra.find((e => e.day === a && e.menuID === n && e.menuProductID === s));
            r && (r.extraQty = t)
        }
        jQuery(".menu-option").click((function() {
            jQuery(".menu-option").removeClass("selected"),
            jQuery(this).addClass("selected"),
            jQuery(".content-option").addClass("hidden");
            const e = jQuery(this).attr("id");
            jQuery("#" + e + "-content").removeClass("hidden"),
            c = e.split("-")[1]
        }
        )),
        jQuery(".order-button").click((function() {
            if (d = jQuery(this).data("days"),
            1 === d)
                jQuery(".step1-first-text h1").html("Alege data pentru care vrei s\u0103 comanzi"),
                jQuery(".step1-first-text p").html("Selecteaz\u0103 data pe care ai vrea s\u0103 comanzi meniul pentru 1 zi"),
                jQuery(".step1-wrapper-cards").hide(),
                jQuery(".text-calendar").hide(),
                h(!1);
            else
                h(d),
                jQuery(".text-intro-calendar").html("Selecteaz\u0103 perioada pe care ai vrea s\u0103 comanzi meniul de " + d + " zile.");
            jQuery("#modalOrder").show(),
            jQuery("body").css("overflow", "hidden")
        }
        )),
        jQuery(".choose-button").click((function() {
            jQuery(".choose-button").removeClass("selected"),
            jQuery(this).addClass("selected")
        }
        )),
        jQuery(".close").click((function() {
            jQuery("#modalOrder").hide(),
            jQuery("body").css("overflow", "auto"),
            jQuery("#step1").show(),
            jQuery("#step2").hide(),
            jQuery("#step3").hide(),
            $(".step1-card-week").each((function(e) {
                $(this).show()
            }
            )),
            $(".choose-button.selected").removeClass("selected"),
            o = {},
            d = 0,
            i = 1,
            v(),
            jQuery("#saveChanges").hide().css("display", "none")
        }
        )),
        jQuery("#next1").click((function() {
            
            let e = u.selectedDates.length
              , t = void 0 !== $(".choose-button.selected").data("dates");
            e === d || t ? (
            function() {
                let e, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, a = $(".choose-button.selected").data("dates");
                e = a || u.selectedDates.map((function(e) {
                    console.log(e);
                    return e.getFullYear() + "-" + (e.getMonth() + 1).toString().padStart(2, "0") + "-" + e.getDate().toString().padStart(2, "0")
                }
                
                )).join(",")
                // $.ajax({
                //     url: window.fetchProducts.ajaxurl,
                //     type: "POST",
                //     data: {
                //         action: "fetchProducts",
                //         dates: e,
                //         dayNo: t,
                //         categorySlug: c
                //     },
                //     success: function(e) {
                //         y = e,
                //         jQuery("#step2").show(),
                //         v()
                //     },
                //     error: function(e) {
                //         console.log("Failed to fetch products", e)
                //     }
                // })
            }()) : m("V\u0103 rug\u0103m s\u0103 selecta\u021bi num\u0103rul corect de zile sau una dintre recomand\u0103ri.")
        }
        )),
        jQuery("#backDay").click((function() {
            i > 1 && (i--,
            v())
        }
        )),
        jQuery("#nextDay").click((function() {
            let e = !0;
            jQuery(".meal").each((function() {
                if (1 !== jQuery(this).find(".selected").length)
                    return e = !1,
                    !1
            }
            )),
            e ? i < d && (i++,
            v(),
            $("#modalOrder").animate({
                scrollTop: 0
            }, "slow")) : m("Te rugam sa alegi un produs pentru fiecare fel de mancare!")
        }
        )),
        jQuery("#nextStep, #saveChanges").click((function() {
            let e = !0;
            jQuery(".meal").each((function() {
                if (1 !== jQuery(this).find(".selected").length)
                    return e = !1,
                    !1
            }
            )),
            e ? (jQuery("#step2").hide(),
            jQuery("#step3").show(),
            function() {
                const e = 1 === d ? "zi" : "zile";
                jQuery("#summaryHeader").text(`Rezumat meniu ${d} ${e}`);
                let t = "";
                const a = ["Mic dejun", "Pranz Felul 1", "Pranz Felul 2", "Cina"];
                for (let s = 1; s <= d; s++) {
                    if (t += '<div class="summary-card">',
                    t += `<h3>Ziua ${s}</h3>`,
                    o[s]) {
                        const e = o[s];
                        for (let n of a)
                            e[n] && (t += `<div><h2>${n}</h2> ${e[n]}</div>`);
                        e.Extra && (t += "<div><h2>Extra</h2>",
                        t += '<div class="extra-items">',
                        Object.values(e.Extra).forEach(( (a, n) => {
                            t += `<p>${e.meta.Extra[n].extraQty} &times; ${a}</p>`
                        }
                        )),
                        t += "</div>",
                        t += "</div>")
                    }
                    t += `<button class="modify-btn" data-day="${s}">Modific\u0103</button>`,
                    t += "</div>"
                }
                jQuery("#dayCardsContainer").html(t);
                let n = 0;
                jQuery(".summary-card").each((function() {
                    jQuery(this).height() > n && (n = jQuery(this).height())
                }
                )),
                jQuery(".summary-card").height(n)
            }()) : m("Te rugam sa alegi un produs pentru fiecare fel de mancare!")
        }
        )),
        jQuery(document).on("click", "#finalOrder", (function() {
            !function(e) {
                jQuery.ajax({
                    url: window.cart.ajaxurl,
                    method: "POST",
                    data: {
                        action: "addToCart",
                        userChoices: e,
                        totalDays: d
                    },
                    success: function(e) {
                        e.success && (m(e.data.message),
                        window.location.href = e.data.cart_url)
                    },
                    error: function(e) {
                        console.log(e)
                    }
                })
            }(o)
        }
        )),
        jQuery(document).on("click", ".modify-btn", (function() {
            i = jQuery(this).data("day"),
            jQuery("#step2").show(),
            jQuery("#step3").hide(),
            v(),
            $("#saveChanges").show().css("display", "flex"),
            $("#backDay, #nextDay, #nextStep").hide().css("display", "none")
        }
        ))
    }
    ,
    "./scripts/reviews-carousel.js": () => {
        function e() {
            let e = []
              , t = 0;
            function a(a) {
                t = a,
                function() {
                    if (e.length > 0) {
                        const a = e[t];
                        jQuery(".review-text").text(a.text),
                        jQuery(".review-author").text(a.author),
                        jQuery(".review-date").text(a.date),
                        jQuery("#current-index").text(t + 1),
                        jQuery("#total-reviews").text(e.length)
                    }
                }()
            }
            jQuery("#prev").click((function() {
                t > 0 && a(t - 1)
            }
            )),
            jQuery("#next").click((function() {
                t < e.length - 1 && a(t + 1)
            }
            )),
            jQuery.ajax({
                url: window.reviews.ajaxurl,
                type: "POST",
                data: {
                    action: "fetch_google_reviews"
                },
                success: function(t) {
                    t.success ? (e = t.data,
                    a(0)) : console.error("Error fetching reviews:", t.data)
                },
                error: function(e) {
                    console.error("Error:", e)
                }
            })
        }
        jQuery(document).ready((function(t) {
            e()
        }
        ))
    }
}, e => {
    var t = t => e(e.s = t);
    e.O(0, [802, 35], ( () => (t("./scripts/reviews-carousel.js"),
    t("./scripts/modal-order.js"),
    t("./styles/homepage.css"),
    t("./styles/modal-order.css"))));
    e.O()
}
]);
