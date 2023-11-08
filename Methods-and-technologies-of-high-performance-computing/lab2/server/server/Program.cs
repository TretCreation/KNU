var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "calculator",
        pattern: "Calculator",
        defaults: new { controller = "Calculator", action = "Index" }
    );
});

// config.Routes.MapHttpRoute(
//     name: "CalculatorApi",
//     routeTemplate: "api/calculator/{action}",
//     defaults: new { controller = "Calculator" }
// );

// app.MapHub<ChatHub>("chat-hub");

app.Run();
