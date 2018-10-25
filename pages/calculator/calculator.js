// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fontSize:1,
    point:false,
    operation:'',
    number1:'0',  //显示的数
    number2:'0',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  clearNumber:function()
  {
      this.setData({
        fontSize: 1,
        point: false,        
        operation: '',
        number1: '0',
        number2: '0',
      });
  },

  cal:function()
  {
    var a = this.data.number1;
    a = parseFloat(a);
    var b = this.data.number2;
    b = parseFloat(b);
    var bs = 1;
    while ( ((a * bs + '').indexOf('.') > 0) || ((b * bs + '').indexOf('.') > 0))
    {
        bs*=10;
    }
    a=a*bs;
    b=b*bs;
    var op = this.data.operation;
    this.setData({
      point:false,
      operation: ''
    }) 
    switch(op)
    {
      case '+':
      b=(b+a)/bs;
      this.setData({
        number1:b+'',
        number2:'0'
      });
      break;

      case '-': 
        b = (b-a)/bs;
        this.setData({
          number1: b + '',
          number2: '0'
        });
        break;

      case '×':
        b = b*a/bs/bs;
        this.setData({
          number1: b + '',
          number2: '0'
        });
        break;   
      case '÷':

        if(a==0)
        {
          wx.showToast({
            title: '除数不能为0',
            image: '../../images/error.png'
          })
          setTimeout(function(){
            wx.hideToast();
          },1000);
          return 
        }

        b = b/a/bs;
        this.setData({
          number1: b + '',
          number2: '0'
        });
        break;    
      case '%':
        b = b%a/bs;
        if (a == 0) {
          wx.showToast({
            title: '除数不能为0',
            image:'../../images/error.png'
          })
          setTimeout(function () {
            wx.hideToast();
          }, 1000);
          return
        }
        this.setData({
          number1: b + '',
          number2: '0'
        });
        break;                          
    }
    if (this.data.number1.length>11)
    {
      var str = this.data.number1;
      var i = str.indexOf('e');
      if(i>0)
      {
        var start = str.slice(0, i);
        var end = str.slice(i);
        var endl = end.length;
        var startl = 11 - endl;
        var newstart = start.slice(0, startl);
        var newstr = newstart + end;
        this.setData({
          number1: newstr
        })
      }
      else
      {
        this.setData({
          number1: this.data.number1.slice(0,11)
        })        
      }

    }
    if (this.data.number1.length > 6) {
      this.setData({
        fontSize: 0
      })
    }
    else {
      this.setData({
        fontSize: 1
      })
    }
  
  },


  operation:function(e)
  {
    var op = e.target.dataset.n;
    this.setData({
      number2: this.data.number1,
      number1: '0',
      operation: op,
      point:false
    });    
  },

  inputNumber:function(e)
  {

    if (this.data.number1.length == 11) {
      
      return;
    }    

    var input = e.target.dataset.n;
    var oldNum = this.data.number1;

    if (oldNum.indexOf('.') > 1 || oldNum.indexOf('.')==-1)      //清除前面部分的0
    {
      while(oldNum[0]=='0')
      {
        oldNum= oldNum.substr(1);
      }
    }
    else
    {
      this.setNumber(oldNum) 
    }

    

    oldNum +=input;
    this.setNumber(oldNum);
    if (this.data.number1.length>6)
    {
      this.setData({
        fontSize:0
      })
    }
    else
    {
      this.setData({
        fontSize: 1
      })      
    }
  },



  fan:function()
  {
    var num = this.data.number1;
    num = -parseFloat(num);
    this.setNumber(num);
  },

  addPoint:function(e)
  {
    
    if(this.data.number1.length>11)
    {
      return;
    }
    if(this.data.point==false)
    {
      
      var input = e.target.dataset.n;
      var oldNum = this.data.number1;
      oldNum += input;
      this.setNumber(oldNum);
      this.setData({
        point:true
      })
      if (this.data.number1.length > 6) {
        this.setData({
          fontSize: 0
        })
      }
      else {
        this.setData({
          fontSize: 1
        })
      }      
    }


  },

  clearZero:function(str)
  {
    var str = str;
    
  },

  setNumber:function(Number)
  {
    this.setData({
      number1:Number
    })
    // console.log(this.data.number1)
  },  


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})