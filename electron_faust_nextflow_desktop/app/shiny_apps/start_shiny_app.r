library("shiny")
print("THIS IS WHERE I WOULD START SHINY")


# runApp("./faust_tools/inst/FAUSTApp/app.R")
# print(normalizePath(getwd()))
# "/Users/lknecht/Repositories/FAUST_Nextflow_Desktop/electron_faust_nextflow_desktop"
faust_shiny_app_file_path <- file.path(getwd(), "app", "shiny_apps", "faust_tools", "inst", "FAUSTApp", "app.R")
print(faust_shiny_app_file_path)
runApp(faust_shiny_app_file_path)

