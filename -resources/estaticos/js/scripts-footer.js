// Manipula uma lista de callbacks que podem ser usados em operações assincrona
var callbackList = {};

// O callback passado para a função addCallback será executado instantaneamente
// se o método relacionado ao callback já estiver sido executado
function addCallBack(callbackName, callbackFunction) {
    if (callbackFunction instanceof Function) {
        if (callbackList[callbackName] == undefined) {
            callbackList[callbackName] = {
                functions: [callbackFunction],
                parameters: null
            };
        } else {
            if (callbackList[callbackName].parameters != null) {
                callbackList[callbackName].functions.push(callbackFunction);
                triggerCallBack(callbackName, callbackList[callbackName].parameters);
            } else {
                callbackList[callbackName].functions.push(callbackFunction);
            }
        }
    }
}

function triggerCallBack(callbackName) {
    if (callbackList[callbackName] != undefined) {
        var callbacks = callbackList[callbackName].functions;
        var parameters = [];

        if (callbackList[callbackName].parameters == null) {
            for (var i = 1; i < arguments.length; i++) {
                parameters.push(arguments[i]);
            }
        } else {
            parameters = callbackList[callbackName].parameters;
        }

        for (var c in callbacks) {
            callbacks[c].apply(this, parameters);
        }

        callbackList[callbackName].functions = [];
        if (callbackList[callbackName].parameters == null) {
            callbackList[callbackName].parameters = parameters;
        }
    }
}



function formatValueToMoney(value) {
    if (Object.prototype.toString.call(value) === "[object Object]" && Object.prototype.toString.call(value.amount) === "[object Number]") {
        value = value.amount;
    }

    var re = "\\d(?=(\\d{3})+\\.)",
    formatedValue = value.toFixed(2).replace(new RegExp(re, "g"), "$&\."),
    i = formatedValue.lastIndexOf(".");

    if (i !== -1) {
        formatedValue = formatedValue.substr(0, i) + "," + formatedValue.substr(i + 1);
    }

    return "R$ " + formatedValue;
}

/* funções topo  */
function getCreditCartTypeImageUrl(creditCardType) {
    return baseUrl + '/template-resources/img/payments/' + getCreditCardTypeByType(creditCardType).imagem;
}

function getCreditCardTypeByType(type) {
    var creditCardTypeReturn = null;
    shoppingCartAjaxController.getShoppingCart({
        async: false,
        callback: function(shoppingCart) {
            jQuery.each(shoppingCart.creditCardTypes, function(i, creditCardType) {
                if (creditCardType.creditCardType == type) {
                    creditCardTypeReturn = creditCardType;
                }
            });
        }
    });
    return creditCardTypeReturn;
}

function getCatalogImageUrl(image, width, height, padding) {
    var url = baseUrl + "/renderImage.image?imageName=" + image;
    if (width) url += "&width=" + width;
    if (height) url += "&height=" + height;
    if (padding) url += "&padding=" + padding;
    return url;
}

function startLoading(seletor) {
    jQuery(seletor).addClass("gifCarregando");
    jQuery(".divCarregando").show();
    var timeoutCarregando = setTimeout("jQuery('.divCarregando').hide();", 10000);
}

function stopLoading(seletor) {
    jQuery(seletor).removeClass("gifCarregando");
    jQuery(".divCarregando").hide();
}

//  remove o ultimo > do breadcrumb
jQuery('ul.breadCrumbRodape li:not(".irParaTopo"):last')
.html(jQuery('ul.breadCrumbRodape li:not(".irParaTopo"):last a'));

function showMsgDialog(title, msg) {
    showModalAviso(title, msg);
}

function closeMsgDialog() {
    closeModalAviso();
}

/*
 * Função para click fechar elementos de menu como itens do carrinho e login
 */

//para fechar a WineBox clicando em qualquer lugar
function habilitaCliqueSumirCarrinho() {
    jQuery("body").click(function(e) {
        var doHide = true;
        // workaround para o release do click no select no IE* não zoar
        var target = $(e.target);
        if (target.className == 'qtdCartItemSelect') {
            doHide = false;
        }
        if (doHide) {
            // itens carrinho
            if (jQuery("#itensWinebox").css("display") != "none" && !jQuery("#novaQuantidade").is(":focus")) {
                jQuery("#itensWinebox").fadeOut();
            }
            // login (nao logado)
            if (jQuery("#boxLoginAberto").css("display") != "none") {
                hideLoginForm();
            }
            // login (logado)
            hideLoginLogadoEstatico();
            // listas
            jQuery('.dropdownCompartilhar').hide();
            jQuery('.listaDropdown').hide();
            //autocomplete
            jQuery(".autocompleteResult, .searchSuggestion").empty();
            jQuery(".autocompleteResult, .searchSuggestion").hide();
        }
    });
}

//desabilita o clique do body
function desabilitaCliqueSumirCarrinho() {
    jQuery('body').unbind('click');
}

// carrinho
jQuery('.corpoItensWinebox').on('mouseenter', function() {
    desabilitaCliqueSumirCarrinho();
});
jQuery('.corpoItensWinebox').on('mouseleave', function() {
    habilitaCliqueSumirCarrinho();
});

jQuery('.finalizarCompra').on('mouseenter', function() {
    desabilitaCliqueSumirCarrinho();
});
jQuery('.finalizarCompra').on('mouseleave', function() {
    habilitaCliqueSumirCarrinho();
});

// login topo
jQuery('.conteudoLoginAberto').on('mouseenter', function() {
    desabilitaCliqueSumirCarrinho();
});
jQuery('.conteudoLoginAberto').on('mouseleave', function() {
    habilitaCliqueSumirCarrinho();
});

jQuery('.boxLogin').on('mouseenter', function() {
    desabilitaCliqueSumirCarrinho();
});
jQuery('.boxLogin').on('mouseleave', function() {
    habilitaCliqueSumirCarrinho();
});

jQuery('.conteudoBoxEmail').on('mouseenter', function() {
    desabilitaCliqueSumirCarrinho();
});
jQuery('.conteudoBoxEmail').on('mouseleave', function() {
    habilitaCliqueSumirCarrinho();
});

// listas e compartilhar
jQuery('.btAdicionarListas').on('mouseenter', function() {
    desabilitaCliqueSumirCarrinho();
});
jQuery('.btAdicionarListas').on('mouseleave', function() {
    habilitaCliqueSumirCarrinho();
});

jQuery('.btCompartilhar').on('mouseenter', function() {
    desabilitaCliqueSumirCarrinho();
});
jQuery('.btCompartilhar').on('mouseleave', function() {
    habilitaCliqueSumirCarrinho();
});

jQuery('.listaDropdown').on('mouseenter', function() {
    desabilitaCliqueSumirCarrinho();
});
jQuery('.listaDropdown').on('mouseleave', function() {
    habilitaCliqueSumirCarrinho();
});

jQuery('.dropdownCompartilhar').on('mouseenter', function() {
    desabilitaCliqueSumirCarrinho();
});
jQuery('.dropdownCompartilhar').on('mouseleave', function() {
    habilitaCliqueSumirCarrinho();
});

jQuery('.itemListaDropdown').on('mouseenter', function() {
    desabilitaCliqueSumirCarrinho();
});
jQuery('.itemListaDropdown').on('mouseleave', function() {
    habilitaCliqueSumirCarrinho();
});

jQuery('.redesSociais').on('mouseenter', function() {
    desabilitaCliqueSumirCarrinho();
});
jQuery('.redesSociais').on('mouseleave', function() {
    habilitaCliqueSumirCarrinho();
});

jQuery('.formCompartilhar').on('mouseenter', function() {
    desabilitaCliqueSumirCarrinho();
});
jQuery('.formCompartilhar').on('mouseleave', function() {
    habilitaCliqueSumirCarrinho();
});

//autocomplete
jQuery('.autocompleteResult, .searchSuggestion').on('mouseenter', function() {
    desabilitaCliqueSumirCarrinho();
});
jQuery('.autocompleteResult, .searchSuggestion').on('mouseleave', function() {
    habilitaCliqueSumirCarrinho();
});

habilitaCliqueSumirCarrinho();

function showLoginForm() {
    jQuery("#boxLoginAbertoWine").show();
    jQuery("#boxLoginWine").hide();
    jQuery("#boxLoginAberto").show();
    jQuery("#boxLogin").hide();
    jQuery("#itensWinebox").fadeOut();
}

function hideLoginForm() {
    jQuery("#boxLoginAberto").hide();
    jQuery("#boxLogin").show();
}

function hideLoginForm() {
    jQuery("#boxLoginAbertoWine").hide();
    jQuery("#boxLoginWine").show();
    jQuery("#boxLoginAberto").hide();
    jQuery("#boxLogin").show();
}

function showLoginLogadoEstatico() {
    jQuery("#boxLoginLogado").show();
}

function hideLoginLogadoEstatico() {
    jQuery("#boxLoginLogado").hide();
}

function customerHasClubeW() {
    return customerHasClube('PREMIUM') || customerHasClube('CLASSIC') || customerHasClube('ONE') || customerHasClube('ESPUMANTES') || customerHasClube('FRESH');
}

function customerIsPrime() {
    customerAjaxController.getLoggedCustomer(function(customer){
        if (customer != null) {
            if(customer.beneficiosClube && customer.socioPrime) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    });
}

function customerHasClube(clube) {
    if (customerSignature && customerSignature.length) {
        if (!clube) {
            return true;
        }

        if (!(typeof clube === "string")) {
            throw "O parâmetro deve ser uma string";
        }

        clube = clube.toUpperCase();

        for (assinatura in customerSignature) {
            assinatura = customerSignature[assinatura];
            if (clube === assinatura.modalidadeCode.toUpperCase()) {
                return true;
            }
        }
    }
    return false;
}

var customerIsSocio = false;

verifyingEnviroment({

    prodHmg: function() {
        // carrega o cart
        startLoading("#topoWineBoxNumItens");
        shoppingCartService.getShoppingCart(function(shoppingCart) {
            stopLoading("#topoWineBoxNumItens");
            updateValorShoppingCart(shoppingCart);
        });

        var title = document.getElementsByTagName("title")[0],
        dadosDatalayer = {},
        UserId = "";


        if(title != undefined) {
            title = title.innerHTML.replace(/^\s+|\s+$/g, "");
        }

        dadosDatalayer = {
            'url': window.location.href,
            'title': title
        }

        //Carrega o objeto signature
        customerAjaxController.getLoggedCustomer(function(customer) {
            customerObject = customer;

            //customerIsSocio = customer.beneficiosClube;

            if (customerObject === null) {
                onLoadCustomerData();
                return;
            }

            UserId = customer.guid;
            dadosDatalayer['tipoUsuario'] = "Cliente";
            dadosDatalayer['tipoOne'] = "Não sócio";
            dadosDatalayer['tipoClassic'] = "Não sócio";
            dadosDatalayer['tipoAdvanced'] = "Não sócio";
            dadosDatalayer['tipoPremium'] = "Não sócio";
            dadosDatalayer['tipoFresh'] = "Não sócio";
            dadosDatalayer['tipoEspumante'] = "Não sócio";
            dadosDatalayer['tipoPrime'] = customer.socioPrime ? "Sim" : "Não";
            dadosDatalayer['userId'] = UserId;

            triggerCallBack("getLoggedCustomer", customer);

            clubeAssinaturaAjaxController.getAssinaturasDoLoggedCustomer({
                callback: function(signature) {
                    customerSignature = signature;

                    if (customerSignature.length != 0) {
                        dadosDatalayer['tipoUsuario'] = "Sócio";
                        dadosDatalayer['tipoOne'] = "Não sócio";
                        dadosDatalayer['tipoClassic'] = "Não sócio";
                        dadosDatalayer['tipoAdvanced'] = "Não sócio";
                        dadosDatalayer['tipoPremium'] = "Não sócio";
                        dadosDatalayer['tipoFresh'] = "Não sócio";
                        dadosDatalayer['tipoEspumante'] = "Não sócio";


                        for (var i = customerSignature.length - 1; i >= 0; i--) {

                            switch(customerSignature[i].modalidadeCode)
                            {
                                case "ONE":
                                dadosDatalayer['tipoOne'] = "Sócio";
                                break;

                                case "CLASSIC":
                                dadosDatalayer['tipoClassic'] = "Sócio";
                                break;

                                case "ADVANCED":
                                dadosDatalayer['tipoAdvanced'] = "Sócio";
                                break;

                                case "PREMIUM":
                                dadosDatalayer['tipoPremium'] = "Sócio";
                                break;

                                case "FRESH":
                                dadosDatalayer['tipoFresh'] = "Sócio";
                                break;

                                case "ESPUMANTE":
                                dadosDatalayer['tipoEspumante'] = "Sócio";
                                break;


                            }
                        }
                    }

                    if (typeof Mediator != "undefined") {
                        if (typeof mediator === "undefined") {
                            mediator = new Mediator();
                        }

                        mediator.publish("loggedCustomer", customer);
                    }

                    triggerCallBack("getAssinaturasDoLoggedCustomer", signature);
                    onLoadCustomerData();
                },
                errorHandler: function(error) {

                }
            });

        });
        dataLayer.push(dadosDatalayer);
    }
});

function loadLogin() {
    // carrega o login
    if (customerObject != undefined && customerObject != null && customerObject.apelido != null) {
        if (customerObject.apelido != undefined && customerObject.apelido != '') {
            jQuery("#logado-box .text-login").html(customerObject.apelido);
        } else {
            jQuery("#logado-box .text-login").html(customerObject.firstName);
        }
        jQuery("#login-box").hide();
        jQuery("#logado-box").show();
    }
}

function changeOptionsPage() {
    // IMPLEMENTAR CÓDIGO QUE EXIBE "INDIQUE" NO MENU
    var actualPage = window.location.href;
    if (actualPage.indexOf("clubew/classic") > -1) {
        actualPage = "classic";
    } else if (actualPage.indexOf("clubew/premium") > -1) {
        actualPage = "premium";
    } else if (actualPage.indexOf("clubew/one") > -1) {
        actualPage = "one";
    } else if (actualPage.indexOf("clubew/espumantes") > -1) {
        actualPage = "espumantes"
    } else if (actualPage.indexOf("clubew/fresh") > -1) {
        actualPage = "fresh";
    }

    // Ajuste da visualização do preço para a ação de recompra do clubew de 2014
    if (window.location.href.match(/clubew\/(one|classic|premium)\/selecoes\-anteriores\/201[34]/g) != null) {

        if (customerHasClubeW()) {
            jQuery(".info").find(".precoPorBox").remove();
        } else {
            jQuery(".info").find(".precoDeBox").remove();
        }

    }

    if (customerHasClube(actualPage) || customerHasClube(actualPage + "2014")) {
        jQuery(".socio-clube").show();
        jQuery('.js-itemIndiqueAmigos').show();
        jQuery(".cliente-loja").hide();
    } else {
        jQuery(".socio-clube").hide();
        jQuery('.js-itemIndiqueAmigos').remove();
        jQuery('.boxLoginLogado li:last-child').addClass('noImage');
        jQuery(".cliente-loja").show();
    }

    if (customerHasClube() || customerIsPrime()) {
        jQuery(".is-socio").show();
        jQuery(".isnot-socio").hide();
    } else {
        jQuery(".is-socio").hide();
        jQuery(".isnot-socio").show();
    }

    //Conteúdo exclusivo para sócios do clube de espumantes
    if (customerHasClube('espumantes')) {
        jQuery('.is-socio-espumantes').show();
        jQuery('.isnot-socio-espumantes').hide();
    } else {
        jQuery('.is-socio-espumantes').hide();
        jQuery('.isnot-socio-espumantes').show();
    }

    //Conteúdo exclusivo para sócios do clube de one
    if (customerHasClube('one')) {
        jQuery('.is-socio-one').show();
        jQuery('.isnot-socio-one').hide();
    } else {
        jQuery('.is-socio-one').hide();
        jQuery('.isnot-socio-one').show();
    }

    //Conteúdo exclusivo para sócios do clube de classic
    if (customerHasClube('classic')) {
        jQuery('.is-socio-classic').show();
        jQuery('.isnot-socio-classic').hide();
    } else {
        jQuery('.is-socio-classic').hide();
        jQuery('.isnot-socio-classic').show();
    }

    //Conteúdo exclusivo para sócios do clube de premium
    if (customerHasClube('premium')) {
        jQuery('.is-socio-premium').show();
        jQuery('.isnot-socio-premium').hide();
    } else {
        jQuery('.is-socio-premium').hide();
        jQuery('.isnot-socio-premium').show();
    }

    //Conteúdo exclusivo para sócios do clube de fresh
    if (customerHasClube('fresh')) {
        jQuery('.is-socio-fresh').show();
        jQuery('.isnot-socio-fresh').hide();
    } else {
        jQuery('.is-socio-fresh').hide();
        jQuery('.isnot-socio-fresh').show();
    }
}

function onLoadCustomerData() {
    loadLogin();
    changeOptionsPage();

    /* Controla o envio de convite */
    if (customerObject) {
        usuarioLogadoEmail = customerObject.userId;
    }
}

onLoadCustomerData();

/* habilitar placeholder no ie  */
// if (!Modernizr.input.placeholder) {
//     jQuery('[placeholder]').focus(function() {
//         var input = jQuery(this);
//         if (input.val() == input.attr('placeholder')) {
//             input.val('');
//             input.removeClass('placeholder');
//         }
//     }).blur(function() {
//         var input = jQuery(this);
//         if (input.val() == '' || input.val() == input.attr('placeholder')) {
//             input.addClass('placeholder');
//             input.val(input.attr('placeholder'));
//         }
//     }).blur();
//     jQuery('[placeholder]').parents('form').submit(function() {
//         jQuery(this).find('[placeholder]').each(function() {
//             var input = jQuery(this);
//             if (input.val() == input.attr('placeholder')) {
//                 input.val('');
//             }
//         })
//     });
// }

// function closeModal(elem) {
//     elem = jQuery(elem);
//     elem.fadeOut();
//     jQuery('.bgWhite').fadeOut();
// }

// function showModal(elem, closeDelay) {
//     elem = jQuery(elem);
//     jQuery(".modalAviso .modalAcao").fadeOut();
//     elem.parent('.bgWhite').fadeOut();

//     if (elem.attr("class") == "modalAviso" && elem.offset().top > jQuery(".menuPrincipal").offset().top) {
//         elem.css('top', '30px').fadeIn();
//     } else if (elem.attr("class") == "modalAviso" && elem.offset().top <= jQuery(".menuPrincipal").offset().top - 20) {
//         elem.css('top', '190px').fadeIn();
//     } else {
//         elem.fadeIn();
//     }

//     if (elem.attr("class") != "modalAviso") {
//         elem.parent('.bgWhite').fadeIn();
//     }

//     if (closeDelay != undefined || elem.attr("class") == "modalAviso") {
//         if (closeDelay == undefined) {
//             closeDelay = 3000;
//         }
//         setTimeout(function() {
//             elem.fadeOut();
//             jQuery('.bgWhite').fadeOut();
//         }, closeDelay);
//     }
// }

// function showModalPhysicalAndDigitalProd() {
//     jQuery("#content").append(jQuery("#modalPhysicalAndDigitalProd").tmpl());
// }

function verifyingEnviroment(callback) {
    if (urlStore === production || urlStore === uat) {
        if (callback.prodHmg && typeof(callback.prodHmg) === "function") {
            callback.prodHmg();
        }
    } else {
        if (callback.dev && typeof(callback.dev) === "function") {
            callback.dev();
        }
    }
}

if (typeof _satellite != "undefined") {
    _satellite.pageBottom();
}

// function showMsgDialog(title, msg) {
//     jQuery("#modalMsg").empty();
//     jQuery("#modalMsgDialog").tmpl({
//         "title": title,
//         "msg": msg
//     }).appendTo("#modalMsg");
//     jQuery("#modalMsg .bgWhite").fadeIn();
// }
