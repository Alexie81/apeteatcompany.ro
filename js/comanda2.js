"use strict";
(self.webpackChunk_roots_bud_sage_sage = self.webpackChunk_roots_bud_sage_sage || []).push([[637], {
    "./styles/orderpage.css": () => {}
    ,
    "./scripts/orderpage.js": (e, t, a) => {
        var n = a("../node_modules/flowbite/lib/esm/index.js")
          , s = a("../node_modules/air-datepicker/index.es.js")
          , r = a("../node_modules/swiper/swiper-bundle.mjs");
        let i = 1
          , d = 0
          , o = "clasic"
          , l = {};
        const c = "#datepicker";
        let u, m;
        function p(e) {
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
        function g(e) {
            jQuery(c).html() && jQuery(c).empty();
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
                minDate: y(),
                maxDate: h(),
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
            u = new s.Z(c,t)
        }
        function y() {
            let e = new Date
              , t = 6e4 * e.getTimezoneOffset()
              , a = new Date(e.getTime() + t + 108e5);
            a.getHours() > 12 | 12 === a.getHours() ? a.setDate(a.getDate() + 2) : a.setDate(a.getDate() + 1),
            a.setHours(0, 0, 0, 0);
            let n = a.getFullYear()
              , s = a.getMonth() + 1
              , r = a.getDate();
            return s = s < 10 ? "0" + s : s,
            r = r < 10 ? "0" + r : r,
            `${n}-${s}-${r}`
        }
        function h() {
            let e = new Date
              , t = (8 - e.getDay()) % 7;
            0 === e.getDay() && e.getHours() < 12 ? t = 1 : 0 !== e.getDay() && 0 !== t || (t += 7),
            e.setDate(e.getDate() + t + 20);
            let a = e.getFullYear()
              , n = e.getMonth() + 1
              , s = e.getDate();
            return n = n < 10 ? "0" + n : n,
            s = s < 10 ? "0" + s : s,
            `${a}-${n}-${s}`
        }
        function f() {
            !function() {
                const e = 1 === d ? "zi" : "zile";
                jQuery("#days-header-orderpage").html(`Meniu ${d} ${e}`)
            }(),
            function() {
                var e = $("#container-days-orderpage");
                e.empty();
                let t = 1;
                Object.keys(m[o]).sort(( (e, t) => new Date(e) - new Date(t))).forEach((function(a, n) {
                    const s = function(e) {
                        const t = e.substring(0, 4)
                          , a = e.substring(4, 6)
                          , n = e.substring(6, 8)
                          , s = new Date(`${t}-${a}-${n}`)
                          , r = s.getDate()
                          , i = ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"][s.getMonth()];
                        return `${r < 10 ? "0" : ""}${r} ${i}`
                    }(a)
                      , r = t < i
                      , d = $(`<div class="day ${t === i ? "selected" : ""}"></div>`);
                    d.css("color", r ? "#D6C053" : "#AFAFAF"),
                    d.append($(`<div class="date">${s}</div>`)),
                    e.append(d[0]),
                    $.get(themeVars.images["day" + t + "-icon.svg"], (function(e) {
                        const t = $(e).find("svg");
                        t.find("path").css("fill", r ? "#D6C053" : "#AFAFAF"),
                        d.prepend(t)
                    }
                    )),
                    t++
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
                        const a = t.map(( (t, a) => {
                            const n = x(e, a, t);
                            return `\n                <div class="dish-card-orderpage basis-0 grow" data-meal-type="${e}" data-dish-name="${t.name}" data-day="${t.meta.selectedDay}" data-menuID="${t.meta.menuID}" data-productID="${t.meta.menuProductID}" data-index="${a}">\n                    <div class="info-image md:hidden" data-toggle-modal="modal-${e.replace(/\s+/g, "").toLowerCase()}-${a}">\n                        <img src="${themeVars.images["info.png"]}" alt="Informations">\n                    </div>\n\n                    <img src="${t.image.small}" alt="${t.name}" class="dish-image-orderpage">\n\n                    <div class="dish-card-orderpage-text pt-[15px] pb-[40px] pr-[18px]">\n                        <h4 class="text-xs md:text-[20px] color-[#333] font-bold mb-[15px]">${t.name}</h4>\n                        <span class="text-xs md:text-[20px] color-[#333] font-bold">${t.grams}</span>\n                        <div class="my-3 cursor-pointer info-modal hidden md:block" data-toggle-modal="modal-${e.replace(/\s+/g, "").toLowerCase()}-${a}">\n                            <img class="w-14px h-14px inline-block" src="${themeVars.images["info.png"]}" alt="Informations">\n                            <p class="ingredients inline-block" >\n                                Vezi nutrienti si ingredientele...\n                            </p>\n                        </div>\n                    </div>\n\n                    <div class="selected-dish-orderpage">\n                        <div class="horizontal"></div>\n                        <div class="vertical"></div>\n                    </div>\n                    ${n}\n                </div>`
                        }
                        )).join("");
                        return `<div class="meal mb-6"><h3 class="mb-3">${e}</h3><div class="dishes flex flex-col-1 md:flex-col-3 flex-col md:flex-row flex-wrap gap-3">${a}</div></div>`
                    }(t, a)
                }
                )).join("") + function(e, t) {
                    const a = t.map(( (t, a) => {
                        const n = x(e, a, t);
                        return `\n                <div class="extrameal-card-orderpage swiper-slide" data-meal-type="${e}" data-dish-name="${t.name}" data-day="${t.meta.selectedDay}" data-menuID="${t.meta.menuID}" data-productID="${t.meta.menuProductID}" data-index="${a}">\n\n\n                    <img src="${t.image.small}" alt="${t.name}" class="dish-image-orderpage">\n\n                    <div class="dish-card-orderpage-text pt-[15px] pb-[40px] pr-[18px]">\n                        <h4 class="text-xs md:text-[20px] color-[#333] font-bold mb-[15px]">\n                            ${t.name}${t.grams && "g" !== t.grams ? ` - ${t.grams}` : ""}\n                        </h4>\n                        <div class="price-qty grid grid-cols-2">\n                            <span class="font-bold">${t.extraPrice} <span class="currency">${themeVars.currencySymbol}</span></span>\n                            <div class="input-quantity hidden grid-cols-3 place-items-center">\n                                <div class="minus">\n                                    <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">\n                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>\n                                    </svg>\n                                </div>\n                                <span class="text-xs font-bold qty-value" data-extra-qty="1">1</span>\n                                <div class="plus">\n                                    <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">\n                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>\n                                    </svg>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class="selected-dish-orderpage">\n                        <div class="horizontal"></div>\n                        <div class="vertical"></div>\n                    </div>\n                    ${n}\n                </div>`
                    }
                    )).join("");
                    return `<div class="extra-meals-section w-full md:w-[85%] overflow-hidden meal-type mb-6 relative px-[3px] pb-[78px]"><h3 class="mb-3">Extra</h3><div class="swiper-container"><div class="swiper-wrapper">${a}</div><div class="swiper-pagination"></div><div class="swiper-button-next"></div><div class="swiper-button-prev"></div></div></div>`
                }("Extra", e.Extra)
            }(function() {
                const e = Object.keys(m[o]).sort()[i - 1];
                return m[o][e]
            }());
            jQuery("#day-content-orderpage").html(e),
            function() {
                i > 1 ? jQuery("#backDay").show().css("display", "flex") : jQuery("#backDay").hide();
                i < d ? jQuery("#nextDay").show().css("display", "flex") : jQuery("#nextDay").hide();
                i === d ? jQuery("#nextStep").show().css("display", "flex") : jQuery("#nextStep").hide()
            }(),
            $(".dish-card-orderpage").click((function() {
                jQuery(this).siblings().removeClass("selected"),
                jQuery(this).addClass("selected");
                let e = {
                    day: jQuery(this).data("day"),
                    menuID: jQuery(this).data("menuid"),
                    menuProductID: jQuery(this).data("productid")
                };
                const t = jQuery(this).data("meal-type")
                  , a = {
                    name: jQuery(this).find("h4").text(),
                    image: jQuery(this).find(".modal-content-info img").attr("src")
                };
                l[i] || (l[i] = {}),
                l[i].meta || (l[i].meta = {}),
                l[i].meta[t] || (l[i].meta[t] = []),
                l[i].meta[t] = e,
                l[i][t] = a
            }
            )),
            jQuery(".extrameal-card-orderpage").click((function() {
                const e = jQuery(this)
                  , t = {
                    name: e.data("dish-name"),
                    image: e.find(".modal-content-info img").attr("src")
                };
                let a = {
                    day: e.data("day"),
                    menuID: e.data("menuid"),
                    menuProductID: e.data("productid"),
                    extraQty: e.find(".qty-value").data("extra-qty")
                };
                l[i] = l[i] || {},
                l[i].Extra = l[i].Extra || [],
                l[i].meta = l[i].meta || {},
                l[i].meta.Extra = l[i].meta.Extra || [],
                e.hasClass("selected") ? (e.removeClass("selected"),
                e.find(".inner-circle").css("background-color", ""),
                l[i].Extra = l[i].Extra.filter((e => e.name !== t.name || e.image !== t.image)),
                l[i].meta.Extra = l[i].meta.Extra.filter((e => !(e.day === a.day && e.menuID === a.menuID && e.menuProductID === a.menuProductID)))) : (e.addClass("selected"),
                e.find(".inner-circle").css("background-color", "#E1BD06"),
                l[i].Extra.push(t),
                l[i].meta.Extra.push(a));
                const n = e.find(".input-quantity")
                  , s = e.find(".qty-value");
                e.hasClass("selected") ? (n.removeClass("hidden").addClass("grid"),
                s.text("1"),
                s.data("extra-qty", 1)) : n.addClass("hidden").removeClass("grid")
            }
            )),
            jQuery(".extrameal-card-orderpage .minus").click((function(e) {
                e.stopPropagation();
                const t = jQuery(this).closest(".extrameal-card-orderpage")
                  , a = t.find(".qty-value");
                let n = parseInt(a.data("extra-qty"), 10);
                n > 0 && (n -= 1,
                a.data("extra-qty", n).text(n),
                v(t, n)),
                0 === n && t.click()
            }
            )),
            jQuery(".extrameal-card-orderpage .plus").click((function(e) {
                e.stopPropagation();
                const t = jQuery(this).closest(".extrameal-card-orderpage")
                  , a = t.find(".qty-value");
                let n = parseInt(a.data("extra-qty"), 10);
                n += 1,
                a.data("extra-qty", n).text(n),
                v(t, n)
            }
            )),
            new r.Z(".swiper-container",{
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
                    768: {
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
                const e = l[i];
                if (e) {
                    for (const [t,a] of Object.entries(e))
                        "meta" !== t && "Extra" !== t && jQuery(`.dish-card-orderpage:contains("${a.name}")`).addClass("selected");
                    e.meta && e.meta.Extra && e.meta.Extra.forEach((e => {
                        const t = jQuery(`.extrameal-card-orderpage[data-productid="${e.menuProductID}"]`);
                        t.addClass("selected");
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
        function x(e, t, a) {
            var n = Object.entries(a.nutritionalInfo).filter((e => {
                let[t] = e;
                return "allergens" !== t
            }
            )).map((e => {
                let[t,a] = e;
                return `\n            <div class="">\n                <span class="text-[#959393]">${t}: </span>\n                <span class="text-[#333]">${a}</span>\n            </div>`
            }
            )).join("");
            return `<div class="modal-info fixed top-0 left-0 right-0 p-0 bg-black/50 md:p-4 md:inset-0 h-[calc(100%-1rem)] overflow-x-hidden overflow-y-auto max-h-full z-[9999] justify-center items-center flex" id="modal-${e.replace(/\s+/g, "").toLowerCase()}-${t}" style="display: none;">\n        <div class="modal-content-info  bg-[#f9f9f9] relative w-full max-w-md">\n            <div class="close-button-info" data-close-modal="modal-${e.replace(/\s+/g, "").toLowerCase()}-${t}"><div></div><div></div></div>\n            <img src="${a.image.big}" alt="${a.name}" class="modal-info-image">\n                <h3 class="meal-title text-[50px] text-[#333] pl-4">${e}</h3>\n                <p class="meal-ingredients text-sm pl-4">${a.ingredients}</p>\n                <div class="nutritional-info pl-4 text-xs">\n                    ${n}\n                    <div class="allergens">\n                        <h2 class="text-[#333]">Alergeni</h2>\n                        <p>${a.nutritionalInfo.allergens}</p>\n                    </div>\n                </div>\n        </div>\n    </div>`
        }
        function v(e, t) {
            const a = e.data("day")
              , n = e.data("menuid")
              , s = e.data("productid")
              , r = l[i].meta.Extra.find((e => e.day === a && e.menuID === n && e.menuProductID === s));
            r && (r.extraQty = t)
        }
        $("#step2-orderpage").hide(),
        $("#step3-orderpage").hide(),
        $("#step4-orderpage").hide(),
        $("#saveChanges").hide().css("display", "none"),
        $(".menu-option-orderpage").click((function() {
            $(".menu-option-orderpage").removeClass("selected"),
            $(this).addClass("selected"),
            $(".content-option-orderpage").addClass("hidden"),
            $("#" + $(this).attr("id") + "-content").removeClass("hidden")
        }
        )),
        jQuery(".order-button-orderpage").click((function() {
            if (d = jQuery(this).data("days"),
            o = jQuery(this).attr("data-mealPlan"),
            1 === d)
                jQuery(".title-intro-step2").html("Alege data pentru care vrei s\u0103 comanzi"),
                jQuery(".text-intro-step2").html("Selecteaz\u0103 data pe care ai vrea s\u0103 comanzi meniul pentru 1 zi."),
                jQuery(".card-datepicker-orderpage").hide(),
                jQuery(".container-calendar-orderpage h1").hide(),
                jQuery(".calendar-text").hide(),
                g(!1);
            else
                g(d),
                jQuery(".text-intro-step2").html("Selecteaz\u0103 perioada pe care ai vrea s\u0103 comanzi meniul de " + d + " zile.");
            jQuery("#step1-orderpage").hide(),
            jQuery("#step2-orderpage").show(),
            $("html, body").animate({
                scrollTop: 0
            }, "slow")
        }
        )),
        jQuery("#backDay").click((function() {
            i > 1 && (i--,
            f(),
            $("html, body").animate({
                scrollTop: 0
            }, "slow"))
        }
        )),
        jQuery("#backStep2").click((function() {
            jQuery("#step2-orderpage").hide(),
            jQuery("#step1-orderpage").show(),
            $("html, body").animate({
                scrollTop: 0
            }, "slow")
        }
        )),
        jQuery(".choose-button").click((function() {
            jQuery(".choose-button").removeClass("selected"),
            jQuery(this).addClass("selected")
        }
        )),
        jQuery("#next-step2").click((function() {
            let e = u.selectedDates.length
              , t = void 0 !== $(".choose-button.selected").data("dates");
            e === d || t ? (jQuery("#step2-orderpage").hide(),
            function() {
                let e, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, a = $(".choose-button.selected").data("dates");
                let dates = [];
                e = a || u.selectedDates.map((function(e) {
                    dates.push(e);
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
                //         categorySlug: o
                //     },
                //     success: function(e) {
                //         m = e,
                //         jQuery("#step2-orderpage").hide(),
                //         jQuery("#step3-orderpage").show(),
                //         f()
                //     },
                //     error: function(e) {
                //         console.log("Failed to fetch products", e)
                //     }
                // })
                sessionStorage.setItem('dates', JSON.stringify(dates));
                console.log(JSON.parse(sessionStorage.getItem('dates')), dates);
                localStorage.setItem('category', c);
                window.location.href = "order.php"
            }(),
            $("html, body").animate({
                scrollTop: 0
            }, "slow")) : p("V\u0103 rug\u0103m s\u0103 selecta\u021bi num\u0103rul corect de zile sau una dintre recomand\u0103ri.")
        }
        )),
        jQuery(document).on("click", ".modify-btn", (function() {
            i = jQuery(this).data("day"),
            jQuery("#step3-orderpage").show(),
            jQuery("#step4-orderpage").hide(),
            f(),
            $("#saveChanges").show().css("display", "flex"),
            $("#backDay, #nextDay, #nextStep").hide().css("display", "none"),
            $("html, body").animate({
                scrollTop: 0
            }, "slow")
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
            f(),
            $("html, body").animate({
                scrollTop: 0
            }, "slow")) : p("Te rugam sa alegi un produs pentru fiecare fel de mancare!")
        }
        )),
        jQuery("#nextStep, #saveChanges").click((function() {
            let e = !0;
            jQuery(".meal:not(.extra-meals-section)").each((function() {
                if (1 !== jQuery(this).find(".selected").length)
                    return e = !1,
                    !1
            }
            )),
            e ? (!function() {
                const e = 1 === d ? "zi" : "zile";
                jQuery("#days-header-summary").text(`Rezumat meniu ${d} ${e}`);
                let t = "";
                const a = ["Mic dejun", "Pranz Felul 1", "Pranz Felul 2", "Cina"];
                for (let n = 1; n <= d; n++) {
                    if (t += '<div class="summary-card">',
                    t += `<h3>Ziua ${n}</h3>`,
                    l[n]) {
                        const e = l[n];
                        for (let n of a)
                            e[n] && (t += `<div class="content pb-3">\n\n                        <h2 class="px-7">${e[n].name}</h2>\n                    </div>`);
                        e.Extra && (t += '<div class="px-7 pb-7"><h2 class="font-bold text-3xl pb-3">Extra</h2>',
                        t += '<div class="extra-items">',
                        Object.values(e.Extra).forEach(( (a, n) => {
                            t += `<p>${e.meta.Extra[n].extraQty} &times; ${a.name}</p>`
                        }
                        )),
                        t += "</div>",
                        t += "</div>")
                    }
                    t += `<button class="modify-btn pt-4" data-day="${n}">Modific\u0103</button>`,
                    t += "</div>"
                }
                jQuery("#day-content-summary").html(t)
            }(),
            jQuery("#step3-orderpage").hide(),
            jQuery("#step4-orderpage").show(),
            $("html, body").animate({
                scrollTop: 0
            }, "slow")) : p("Te rugam sa alegi un produs pentru fiecare fel de mancare!")
        }
        )),
        $(document).on("click", ".info-image, .info-modal", (function() {
            var e = $(this).data("toggle-modal");
            $("#" + e).css("display", "block"),
            $("body").css("overflow", "hidden")
        }
        )),
        $(document).on("click", ".close-button-info", (function() {
            var e = $(this).data("close-modal");
            $("#" + e).css("display", "none"),
            $("body").css("overflow", "")
        }
        )),
        $("#modal-step4").click((function() {
            $("#modal-step4").hide(),
            $("#container-days-summary").removeClass("pointer-events-none"),
            $("body").css("overflow", "")
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
                        e.success && (p(e.data.message),
                        window.location.href = e.data.cart_url)
                    },
                    error: function(e) {
                        console.log(e)
                    }
                })
            }(l)
        }
        )),
        document.addEventListener("DOMContentLoaded", (function() {
            const e = document.getElementById("step1-orderpage");
            e && e.scrollIntoView();
            const t = window.location.hash.substring(1)
              , a = document.getElementById(t);
            a && a.click()
        }
        ))
    }
}
]);
