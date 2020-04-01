#!/usr/bin/env Rscript

# Taken from here
# https://github.com/dirkschumacher/r-shiny-electron/blob/master/add-cran-binary-pkgs.R

source("install_r_cran_dependencies.r")

cran_packages_to_install <- list(
    list("BiocManager", "1.30.10"),
    list("callr", "3.4.3")
    list("cowplot", "1.0.0"),
    list("dplyr", "0.8.5"),
    list("DT", "0.13"),
    list("foreach", "1.5.0"),
    list("gridExtra", "2.3"),
    list("ggplotify", "0.0.5"),
    list("heatmaply", "1.1.0"),
    list("plotly", "4.9.2"),
    list("rChoiceDialogs", "1.0.6"),
    list("shiny", "1.4.0.2"),
    list("shinyalert", "1.0"),
    list("shinycssloaders", "0.3"),
    list("shinyjs", "1.1"),
    list("shinyFiles", "0.7.5"),
    list("shinyWidgets", "0.5.1"),
    list("tidyr", "1.0.2")
)

bioc_packages_to_install <- c(
    "flowWorkspace",
    "flowCore"
)
# github_packages_to_install <- c(
#     # TODO
# )

# cran_packages <- setdiff(
#     unique(cran_packages_to_install),
# )

if (dir.exists("r-mac")) {
    print("==================================================================");
    print("Installing OSX Specific Dependencies")
    print("==================================================================");
    install_cran_dependencies(cran_packages = cran_packages_to_install,
                              library_path = file.path("r-mac", "library"),
                              type = "mac.binary.el-capitan", decompress = untar)
    # Install bioc dependencies
    # Install github dependencies
}

if (dir.exists("r-win")) {
    print("==================================================================");
    print("Installing Windows Specific Dependencies")
    print("==================================================================");
    install_cran_dependencies(cran_packages = cran_packages_to_install,
                              library_path = file.path("r-win", "library"),
                              type = "win.binary", decompress = unzip)
    # Install bioc dependencies
    # Install github dependencies
}
