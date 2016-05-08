<!doctype html>
<html>
    <head>
        <title>Pierre Bourgeois, développeur freelance.</title>
        <meta charset="utf-8" />
        <?php echo $this->Html->css('site'); ?>
    </head>
    <body>
        <?php echo $this->fetch('content'); ?>


        <script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
        <script src="/js/i18next.js"></script>
        <script src="/js/config.js"></script>
        <script src="/js/site.js"></script>

        <script>
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                        m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

            ga('create', 'UA-62622727-1', 'auto');
            ga('send', 'pageview');

        </script>
    </body>
</html>
