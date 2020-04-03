#!/usr/bin/env Rscript

# Heavily edited from here:
# https://github.com/dirkschumacher/r-shiny-electron/blob/master/add-cran-binary-pkgs.R

# Script to find dependencies of a pkg list, download binaries and put them
# In the standalone R library.

default_cran_repo_url = "https://cloud.r-project.org"

default_package_directories_to_remove <- c("help",
                                           "doc",
                                           "tests",
                                           "html",
                                           "include",
                                           "unitTests",
                                           file.path("libs", "*dSYM"))

installCranDependencies <- function(cran_packages,
                                      library_path,
                                      type,
                                      decompress,
                                      remove_dirs = default_package_directories_to_remove) {
    if (!length(cran_packages)) {
        stop("No cran packages were specified to install")
    }

    previously_installed_libraries <- list.files(library_path)
    requested_packages_to_install <- lapply(cran_packages, 
                                            FUN = function(x) x[[1]])
    requested_packages_to_install <- unlist(requested_packages_to_install)
    detected_cran_packages_to_install <- setdiff(requested_packages_to_install,
                                                 previously_installed_libraries)
    selected_cran_packages_to_install <- cran_packages[!(requested_packages_to_install %in% previously_installed_libraries)]

    if (length(selected_cran_packages_to_install) == 0) {
        print("All CRAN packages have been already been installed")
        return(NA)
    }

    temporary_download_directory <- tempdir()
    downloaded_packages <- lapply(selected_cran_packages_to_install,
                                  FUN = function(element) {
                                      package_name <- element[1]
                                      package_version <- element[2]
                                      if(is.na(package_version)) {
                                          new_downloaded_package <- download.packages(package_name,
                                                                                      destdir = temporary_download_directory,
                                                                                      repo = default_cran_repo_url,
                                                                                      type = type)
                                      }
                                      else {
                                          new_downloaded_package <- download.packages(package_name,
                                                                                      destdir = temporary_download_directory,
                                                                                      repo = default_cran_repo_url,
                                                                                      type = type,
                                                                                      version = package_version)
                                      }
                                  })
    lapply(downloaded_packages,
           FUN = function(element) {
                compressed_file_path = element[2]
                decompress(compressed_file_path, exdir = library_path)
                unlink(compressed_file_path)
            })

    z <- lapply(
        list.dirs(library_path, full.names = TRUE, recursive = FALSE),
        function(x) {
            unlink(file.path(x, remove_dirs), force = TRUE, recursive = TRUE)
        }
    )
    invisible(NULL)
}