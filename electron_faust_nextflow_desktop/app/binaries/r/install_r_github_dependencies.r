#!/usr/bin/env Rscript

# WARNING: This REQUIRES that the `devtools` library is boot strapped using the
#          `install_r_cran_dependencies.r`

default_package_directories_to_remove <- c("help",
                                           "doc",
                                           "tests",
                                           "html",
                                           "include",
                                           "unitTests",
                                           file.path("libs", "*dSYM"))

installGitHubDependencies <- function(github_packages,
                                      library_path,
                                      type,
                                      decompress,
                                      remove_dirs = default_package_directories_to_remove) {
    # This MUST be here - because R imports are the worst
    library("devtools")

    if (!length(github_packages)) {
        stop("No GitHub packages were specified to install")
    }

    previously_installed_libraries <- list.files(library_path)
    requested_packages_to_install <- lapply(github_packages,
                                            FUN = function(x) x[[1]])
    requested_packages_to_install <- unlist(requested_packages_to_install)
    detected_github_packages_to_install <- setdiff(requested_packages_to_install,
                                                 previously_installed_libraries)
    selected_github_packages_to_install <- github_packages[!(requested_packages_to_install %in% previously_installed_libraries)]

    if (length(selected_github_packages_to_install) == 0) {
        print("All GitHub packages have been already been installed")
        return(NA)
    }

    pkgbuild::check_build_tools(debug = TRUE)
    temporary_download_directory <- tempdir()
    downloaded_packages <- lapply(selected_github_packages_to_install,
                                  function(element) {
                                      package_repo <- element[1]
                                      package_version <- element[2]
                                      if(is.na(package_version)) {
                                          new_downloaded_package <- withr::with_libpaths(temporary_download_directory,
                                                                                         install_github(package_repo,
                                                                                                        type = type))
                                          # new_downloaded_package <- install_github(package_repo,
                                          #                                          lib = temporary_download_directory,
                                          #                                          type = type)
                                          # new_downloaded_package <- install_github(package_repo,
                                          #                                          destdir = temporary_download_directory,
                                          #                                          type = type)
                                      }
                                      else {
                                          # TODO: Add the `ref` usage here
                                          # See: https://www.rdocumentation.org/packages/devtools/versions/1.13.6/topics/install_github
                                          stop("Version targetting has NOT been implemented for GitHub dependencies")
                                          # new_downloaded_package <- install_github(package_repo,
                                          #                                          destdir = temporary_download_directory,
                                          #                                          type = type,
                                          #                                          version = package_version)
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