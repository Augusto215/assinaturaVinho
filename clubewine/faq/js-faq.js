/* FAQ */

$('#faqClube .togglefaq').click(function(e) {
    e.preventDefault();
    var notthis = $('#faqClube .active').not(this);
    notthis.toggleClass('active').next('.faqanswer').slideToggle(300);
    $(this).toggleClass('active').next().slideToggle("fast");
});