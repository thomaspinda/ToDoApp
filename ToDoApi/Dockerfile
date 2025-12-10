#Imagen SDK para construir la aplicacion
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["ToDoApi.csproj", "./"]
RUN dotnet restore "./ToDoApi.csproj"
COPY . .
RUN dotnet build "TodoApi.csproj" -c Release -o /app/build

#Imagen de tiempo de ejecucion (Runtime) para el despliegue final
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/build .
#Puerto estándar para contenedores
EXPOSE 8080 
ENTRYPOINT [ "dotnet", "ToDoApi.dll"]
