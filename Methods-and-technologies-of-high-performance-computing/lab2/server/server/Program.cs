var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapControllers();

// app.UseEndpoints(endpoints =>
// {
//     // endpoints.MapControllerRoute(
//     //     name: "calculator",
//     //     pattern: "Calculator",
//     //     defaults: new { controller = "Calculator", action = "Index" }
//     // );
//     app.UseEndpoints(endpoints =>
//     {
//         endpoints.MapControllerRoute(
//             name: "auth",
//             pattern: "{controller=Auth}/{action=Index}/{id?}"
//         );

//         // Add this if you want to enable attribute routing in controllers
//         // endpoints.MapControllers();
//     });
// });

app.Run();
