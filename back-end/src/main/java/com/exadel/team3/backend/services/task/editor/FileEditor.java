package com.exadel.team3.backend.services.task.editor;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FileEditor {
    public static List<File> editFiles(List<File> fileList) throws IOException {
        for (File file : fileList) {

            deletePackage(file);
            deleteRuntime(file);
            deleteSystem(file);

            changePathOutputFile(file);
        }

        return fileList;
    }

    private static void deletePackage(File file) throws IOException {
        Path path = file.toPath();
        String fileContent = new String(Files.readAllBytes(path));
        Pattern pattern = Pattern.compile("^(package ).*(;)");
        Matcher matcher = pattern.matcher(fileContent);
        fileContent = matcher.replaceFirst("");
        Files.write(path, fileContent.getBytes());
    }

    private static void deleteSystem(File file) throws IOException {
        Path path = file.toPath();
        String fileContent = new String(Files.readAllBytes(path));
        Pattern pattern = Pattern.compile("(System\\.).*(\".*\")*(;)");
        Matcher matcher = pattern.matcher(fileContent);
        fileContent = matcher.replaceAll("");
        Files.write(path, fileContent.getBytes());
    }

    private static void deleteRuntime(File file) throws IOException {
        Path path = file.toPath();
        String fileContent = new String(Files.readAllBytes(path));
        Pattern pattern = Pattern.compile("(Runtime\\.).*(;)");
        Matcher matcher = pattern.matcher(fileContent);
        fileContent = matcher.replaceAll("");
        Files.write(path, fileContent.getBytes());
    }

    private static void changePathOutputFile(File file) throws IOException {
        Path path = file.toPath();
        String fileContent = new String(Files.readAllBytes(path));
        String pathOfFile = file.getParent().replaceAll("\\\\", "/") + "/";
        fileContent = fileContent.replaceAll("out.txt",pathOfFile + "out.txt");
        Files.write(path, fileContent.getBytes());
    }
}
