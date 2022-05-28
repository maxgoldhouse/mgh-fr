function openEngForm(title,msg){
    document.getElementById('modal-form').classList.add('is-active');
    //document.getElementById('subj').innerHTML = title;
    document.getElementById('msg').innerHTML = msg;
  }
     //form handler
             function getCookie(name) {
               var value = "; " + document.cookie;
               var parts = value.split("; " + name + "=");
               if (parts.length == 2) return parts.pop().split(";").shift();
             }
             $.fn.serializeObject = function()
             {
               var o = {};
               var a = this.serializeArray();
               $.each(a, function() {
                 if (o[this.name] !== undefined) {
                   if (!o[this.name].push) {
                     o[this.name] = [o[this.name]];
                   }
                   o[this.name].push(this.value || '');
                 } else {
                   o[this.name] = this.value || '';
                 }
               });
               o['url'] = location.protocol + '//' + location.host + location.pathname;
               o['visitor']=getCookie("_ga")
               return o;
             };
             $('form').submit(function() {
               var thedata = JSON.stringify($(this).serializeObject())
               var script = document.createElement('script');
               // commented script includes line htmlbod = htmlbod + '<br/>https://props.maxgoldhouse.com/putpropinemail/'+parsedjson.property+'<br/>';
               script.src = 'https://script.google.com/macros/s/AKfycbx66VnmAyT2Y47okeJI1MUA-2_HGrjooblxqHHKCpZZGmT3Aq594Eq1y24AbLh4Wwz0sQ/exec?data='+thedata;
               //script.src = 'https://script.google.com/macros/s/AKfycbwFOPvfoJMpt-OgtwsC2PDo56pNWO7h5QQjJAgzbsRxBgucsFb9/exec?data='+thedata;
               document.body.appendChild(script);
               var enqname = $(this).find('input[name="name"]').val();
               document.getElementById("modal-form").classList.remove('is-active')
               document.getElementById("thanks").classList.add('is-active')
               $('#thanksmsg').html(enqname);
               return false;
             });