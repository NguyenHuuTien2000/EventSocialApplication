FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app

COPY "EventSocialApp.sln" "EventSocialApp.sln"
COPY "Application/Application.csproj" "Application/Application.csproj"
COPY "Domain/Domain.csproj" "Domain/Domain.csproj"
COPY "Infrastructure/Infrastructure.csproj" "Infrastructure/Infrastructure.csproj"
COPY "Persistence/Persistence.csproj" "Persistence/Persistence.csproj"
COPY "API/API.csproj" "API/API.csproj"

RUN dotnet restore "EventSocialApp.sln"

COPY . .
WORKDIR /app
RUN dotnet publish -c Release -o out


FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
EXPOSE 80
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "API.dll"]