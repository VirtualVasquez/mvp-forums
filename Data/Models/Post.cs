using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my_new_app.Data.Models
{
    public class Post : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
