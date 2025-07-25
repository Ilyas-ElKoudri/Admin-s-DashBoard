using ECommerceApi.Data;
using Microsoft.EntityFrameworkCore;


//1.Application Setup
//•	Creates a new web application builder for an ASP.NET Core app.
//•	args: Passes command-line arguments to the builder (useful for configuration).
//•	builder: The resulting object is used to configure services, middleware,
//  and app settings before building and running the web server.
//  this sets up the basic infrastructure needed for your web application, including:
//•	Configuration(reading settings from files)
//•	Logging
//•	Dependency injection container (a system for managing your application's components)
/*
    var is C# syntactic sugar{
    Syntactic sugar is a term in programming that means:
    A shorter or easier way to write code that the computer could already understand 
    but written in a way that’s more readable or convenient for humans.  
    It doesn’t add new features — it just makes your code look cleaner or simpler} 

    it infers the type automatically from the right-hand side.
    var number = 5; // C# treats it as int
    So this line:

    var builder = WebApplication.CreateBuilder(args);
    Is exactly the same as writing:

    WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
    ✅ Conclusion:  builder is of type WebApplicationBuilder.
*/
var builder = WebApplication.CreateBuilder(args);

//2.Service Configuration

//This is like registering different utilities in your house:
//•	AddControllers(): Enables handling web requests through controller classes
//•	AddEndpointsApiExplorer(): Helps in discovering and documenting API endpoints
//•	AddSwaggerGen(): Adds Swagger(now called OpenAPI) documentation - like creating an instruction manual for your API
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//3. Database Configuration

//•	AddDbContext: Registers your database context
//•	UseSqlServer: Specifies you're using SQL Server
//•	GetConnectionString: Reads the database connection details from your configuration

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//4.Building the Application

//This line finalizes the setup - like turning your building plans into an actual house.
var app = builder.Build();

//5. Middleware Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); // more helpful than generic error page
}
else
{
    app.UseExceptionHandler("/error");
    app.UseHsts();
}

//6. Enable Swagger middleware
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "ECommerce API V1");
});

//7. Add essential middlewares
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();